import { z } from "zod";

// Variant schema validation
export const variantValidationSchema = z.object({
  type: z.string().nonempty("Type is required"),
  value: z.string().nonempty("Value is required"),
});

// Inventory schema validation
export const inventoryValidationSchema = z.object({
  quantity: z
    .number()
    .int()
    .min(0, "Quantity must be a non-negative integer")
    .nonnegative("Quantity cannot be negative"),
  inStock: z.boolean(),
});

// Product schema validation
export const productValidationSchema = z.object({
  name: z.string().nonempty("Name is required"),
  description: z.string().nonempty("Description is required"),
  price: z
    .number()
    .nonnegative("Price must be greater than or equal to 0")
    .min(0, "Price must be at least 0"),
  category: z.string().nonempty("Category is required"),
  tags: z
    .array(z.string())
    .min(1, "At least one tag is required")
    .nonempty("Tags cannot be empty"),
  variants: z
    .array(variantValidationSchema)
    .min(1, "At least one variant is required")
    .nonempty("Variants cannot be empty"),
  inventory: inventoryValidationSchema,
});

export default productValidationSchema;
