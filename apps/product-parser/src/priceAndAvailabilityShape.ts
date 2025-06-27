import { z } from 'zod';

const priceCurrencyRegex =
  /^(?:(?<currency>[A-Z]{3})\s*)?(?<price>\d+(?:[.,]\d{1,2})?)(?:\s*(?<currency2>[A-Z]{3}))?$/;

export const priceAndAvailabilityShape = z.object({
  availability: z.enum(['in stock', 'out of stock', 'preorder', 'backorder']),
  availability_date: z.string().datetime().optional(), //TODO required if  preorder maybe later
  price: z.string().regex(priceCurrencyRegex),
});

export const priceAndAvailabilityTransform = <T extends z.infer<typeof priceAndAvailabilityShape>>({
  price,
  availability_date,
  ...rest
}: T) => {
  const match = price.match(priceCurrencyRegex);
  let currency = null;
  let priceValue = null;

  if (match && match.groups) {
    currency = match.groups.currency || match.groups.currency2 || null;
    priceValue = match.groups.price ? Number(match.groups.price.replace(',', '.')) : null;
  }

  if (!currency || priceValue === null || isNaN(priceValue)) {
    throw new Error('Nieprawidłowy format ceny lub waluty');
  }

  return {
    ...rest,
    availabilityDate: availability_date,
    price: Math.round(priceValue * 100),
    currency,
  };
};
