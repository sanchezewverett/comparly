import { createClient } from './client.repository';
import type { CreateClientInput } from './client.schema';

export const registerClient = async (data: CreateClientInput) => {
  return createClient(data);
};
