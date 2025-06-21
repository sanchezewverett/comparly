import { ZodTypeAny, z } from "zod";

type ValidationSchemas = {
  params?: ZodTypeAny;
  query?: ZodTypeAny;
  body?: ZodTypeAny;
};

type InferredInput<S extends ValidationSchemas> = {
  params: S["params"] extends ZodTypeAny ? z.infer<S["params"]> : undefined;
  query: S["query"] extends ZodTypeAny ? z.infer<S["query"]> : undefined;
  body: S["body"] extends ZodTypeAny ? z.infer<S["body"]> : undefined;
};

export function withValidation<S extends ValidationSchemas>(
  schemas: S,
  handler: (
    input: InferredInput<S>,
    req: Request,
    context: { params: Promise<unknown> }
  ) => Promise<Response>
) {
  return async function (
    req: Request,
    context: { params: Promise<unknown> }
  ): Promise<Response> {
    const errors: Record<string, unknown> = {};
    const result: Partial<InferredInput<S>> = {};

    if (schemas.params) {
      const params = await context.params;
      const parsed = schemas.params.safeParse(params);

      if (!parsed.success) {
        errors.params = parsed.error.flatten();
      } else {
        result.params = parsed.data;
      }
    }

    if (schemas.query) {
      const query = Object.fromEntries(new URL(req.url).searchParams.entries());
      const parsed = schemas.query.safeParse(query);
      if (!parsed.success) {
        errors.query = parsed.error.flatten();
      } else {
        result.query = parsed.data;
      }
    }

    if (schemas.body) {
      try {
        const json = await req.json();
        const parsed = schemas.body.safeParse(json);
        if (!parsed.success) {
          errors.body = parsed.error.flatten();
        } else {
          result.body = parsed.data;
        }
      } catch {
        errors.body = { formErrors: ["Invalid JSON"], fieldErrors: {} };
      }
    }

    if (Object.keys(errors).length > 0) {
      return Response.json(
        { error: "Validation error", issues: errors },
        { status: 400 }
      );
    }

    return handler(result as InferredInput<S>, req, context);
  };
}
