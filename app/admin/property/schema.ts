import z from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

export enum PropertyTypeEnum {
  HOUSE = "HOUSE",
  APARTMENT = "APARTMENT"
}

export enum BHKEnum {
  TWO = "2BHK",
  THREE = "3BHK",
  FOUR_PLUS = "4BHK+"
}

export const PropertySchema = z.object({
    title: z.string().min(5, "Title must be at least 5 characters"),
    description: z.string().min(20, "Description must be at least 20 characters"),

  propertyType: z.enum([PropertyTypeEnum.HOUSE, PropertyTypeEnum.APARTMENT], {
    message: "Please select House or Apartment",
  }),

  bhk: z.enum([BHKEnum.TWO, BHKEnum.THREE, BHKEnum.FOUR_PLUS], {
    message: "Please select a BHK option",
  }),
    price: z.coerce
    .number()
    .positive("Price must be a positive number"),
    address: z.string().min(1, "Address is required"),
    city: z.string().min(1, "City is required"),
    propertyImages:z
            .instanceof(File)
            .optional()
            .refine((file) => !file || file.size <= MAX_FILE_SIZE, {
                message: "Max file size is 5MB",
            })
            .refine((file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type), {
                message: "Only .jpg, .jpeg, .png and .webp formats are supported",
            }),
});
export type PropertyData = z.infer<typeof PropertySchema>;

export const PropertyEditSchema = PropertySchema.partial()
export type PropertyEditData = z.infer< typeof PropertyEditSchema>;

