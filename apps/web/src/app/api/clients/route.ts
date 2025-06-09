import { withValidation } from "@/lib/validation";

import { createClientSchema } from "./client.schema";
import { registerClient } from "./client.service";

export const POST = withValidation(
  { body: createClientSchema },
  async ({ body }) => {
    const newClient = await registerClient(body);
    return Response.json(newClient);
  }
);
