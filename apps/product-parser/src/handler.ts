import { PrismaClient } from "@prisma/client";
import { parseFeedFile } from "./parser";

const prisma = new PrismaClient();
const twelveHoursAgo = new Date(Date.now() - 12 * 60 * 60 * 1000);

export const handler = async () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const errors: any[] = [];
  let totalProducts = 0;

  try {
    const clients = await prisma.client.findMany({
      where: {
        active: true,
        OR: [
          { lastFeedProcessedAt: null },
          { lastFeedProcessedAt: { lt: twelveHoursAgo } },
        ],
      },
      orderBy: { id: "asc" },
    });

    if (clients.length === 0) {
      console.info("No active clients to process");
      return;
    }

    await Promise.all(
      clients.map(async (client) => {
        if (!client.feedUrl) return;

        let products;
        try {
          products = await parseFeedFile(client.feedUrl);
        } catch (err) {
          errors.push({ clientId: client.id, error: `parseFeedFile: ${err}` });
          return;
        }

        if (!products || !products.success) {
          errors.push({
            clientId: client.id,
            error: "No products to process",
          });
          return;
        }

        await Promise.all(
          products.data.map(async (product) => {
            try {
              const internalProduct = await prisma.product.upsert({
                where: { externalId: product.gtin || product.mpn },
                update: {
                  googleCategoryId: product.googleProductCategory
                    ? Number(product.googleProductCategory)
                    : undefined,
                  brand: product.brand,
                  externalId: product.gtin || product.mpn,
                  updatedAt: new Date(),
                },
                create: {
                  googleCategoryId: product.googleProductCategory
                    ? Number(product.googleProductCategory)
                    : undefined,
                  brand: product.brand,
                  externalId: product.gtin || product.mpn!,
                  createdAt: new Date(),
                  updatedAt: new Date(),
                },
              });

              await prisma.productDetails.upsert({
                where: {
                  productId: internalProduct.id,
                },
                update: {
                  name: product.title,
                  internalCategory: product.internalProductCategory,
                  description: product.description,
                  price: product.price,
                  currency: product.currency,
                  productUrl: product.link,
                  imageUrl: product.imageLink,
                  availability: product.availability,
                },

                create: {
                  product: {
                    connect: { id: internalProduct.id },
                  },
                  client: {
                    connect: { id: client.id },
                  },
                  name: product.title,
                  internalCategory: product.internalProductCategory,
                  description: product.description,
                  price: product.price,
                  currency: product.currency,
                  productUrl: product.link,
                  imageUrl: product.imageLink,
                  availability: product.availability,
                },
                include: {
                  product: true,
                },
              });

              totalProducts++;
            } catch (err) {
              errors.push({
                clientId: client.id,
                productId: product.id,
                error: err instanceof Error ? err.message : String(err),
              });
            }
          })
        );

        try {
          await prisma.client.update({
            where: { id: client.id },
            data: { lastFeedProcessedAt: new Date() },
          });
        } catch (err) {
          errors.push({
            clientId: client.id,
            error: `update lastFeedProcessedAt: ${err}`,
          });
        }
      })
    );
  } catch (error: any) {
    errors.push({ error: error.message });
  } finally {
    await prisma.$disconnect();
    if (errors.length > 0) {
      const grouped: Record<number, { productId?: string; error: string }[]> =
        {};
      errors.forEach((err) => {
        const clientId = err.clientId ?? -1;
        if (!grouped[clientId]) grouped[clientId] = [];
        grouped[clientId].push({
          productId: err.productId,
          error: err.error.slice(0, 120),
        });
      });

      Object.entries(grouped).forEach(([clientId, errs]) => {
        console.error(
          `Errors for client ${clientId}: ${errs.length} products failed.`,
          { errors: errs }
        );
      });
    } else {
      console.info(`Import finished. Processed products: ${totalProducts}`);
    }
  }
};
