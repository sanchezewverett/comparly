import { prisma } from '@/lib/prisma';

export const createClient = async (data: {
  name: string;
  email: string;
  feedUrl?: string;
  active?: boolean;
}) => {
  return prisma.client.create({
    data,
  });
};
