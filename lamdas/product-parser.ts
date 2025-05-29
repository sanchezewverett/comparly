import { PrismaClient } from "@prisma/client";
import { parseFeedFile } from "@/parser/parser";
import { ProductDataShape } from "@/parser/model";

const prisma = new PrismaClient();

export const handler = async () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  try {
    const clients = await prisma.client.findMany({
      where: {
        active: true,
        OR: [
          { lastFeedProcessedAt: null },
          { lastFeedProcessedAt: { lt: today } },
        ],
      },
      orderBy: { id: "asc" },
    });

    if (clients.length === 0) {
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: "Brak aktywnych klientów do przetworzenia",
        }),
      };
    }

    let totalProducts = 0;

    await Promise.all(
      clients.map(async (client) => {
        if (!client.feedUrl) return;

        const products: ProductDataShape[] = await parseFeedFile(
          client.feedUrl
        );

        await Promise.all(
          products.map(async (product) => {
            let category = await prisma.category.findUnique({
              where: { name: product.category },
            });
            if (!category) {
              category = await prisma.category.create({
                data: { name: product.category },
              });
            }

            await prisma.product.upsert({
              where: {
                externalId_clientId: {
                  externalId: product.id,
                  clientId: client.id,
                },
              },
              update: {
                name: product.title,
                description: product.description,
                price: Number(product.price),
                currency: product.currency || "PLN",
                brand: product.brand,
                imageUrl: product.image_link,
                productUrl: product.link,
                availability: product.availability,
                categoryId: category.id,
              },
              create: {
                externalId: product.id,
                clientId: client.id,
                name: product.title,
                description: product.description,
                price: Number(product.price),
                currency: product.currency || "PLN",
                brand: product.brand,
                imageUrl: product.image_link,
                productUrl: product.link,
                availability: product.availability,
                categoryId: category.id,
              },
            });
          })
        );

        await prisma.client.update({
          where: { id: client.id },
          data: { lastFeedProcessedAt: new Date() },
        });

        totalProducts += products.length;
      })
    );

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Import zakończony",
        clientsProcessed: clients.length,
        totalProducts,
      }),
    };
  } catch (error: any) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  } finally {
    await prisma.$disconnect();
  }
};
