import { z } from 'zod';

export const createClientSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  feedUrl: z.string().url().optional(),
  active: z.boolean().optional(),
});

export type CreateClientInput = z.infer<typeof createClientSchema>;
