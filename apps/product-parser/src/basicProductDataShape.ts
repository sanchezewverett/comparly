import { z } from "zod";

export const structuredTitleDescription = (message: string) =>
  z.object({
    trained_algorithmic_media: z.any().optional(),
    content: z.string().nonempty(message),
  });

export const basicProductDataShape = z.object({
  id: z.string().max(50, "Id must be at most 50 characters."),
  title: z
    .string()
    .nonempty("Title must be at least 1 character.")
    .max(150, "Title must be at most 50 characters.")
    .or(structuredTitleDescription("Title must be at least 1 character.")),
  description: z
    .string()
    .max(100000, "Description must be at most 5000 characters.")
    .transform((val) => (val && val.trim() !== "" ? val : "Brak opisu"))
    .or(
      structuredTitleDescription("Description must be at least 1 character.")
    ),
  link: z.string().url(),
  image_link: z.string().url(),
});

export const basicProductDataTransform = <
  T extends z.infer<typeof basicProductDataShape>
>({
  title,
  description,
  image_link,
  ...rest
}: T) => ({
  imageLink: image_link,
  title: typeof title === "string" ? title : title.content,
  description:
    typeof description === "string" ? description : description.content,
  ...rest,
});
