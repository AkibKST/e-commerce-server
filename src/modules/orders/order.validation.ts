import { z } from "zod";

// Zod validation schema for Order model
const orderValidationSchema = z.object({
  email: z.string().email("Invalid email format").nonempty("Email is required"),
  productId: z
    .string()
    .length(24, "Product ID must be exactly 24 characters long")
    .nonempty("Product ID is required"),
  price: z
    .number()
    .min(0, "Price must be a positive number")
    .refine((value) => Number.isInteger(value), {
      message: "Price must be an integer",
    }),
  quantity: z
    .number()
    .min(0, "Quantity must be a non-negative number")
    .refine((value) => Number.isInteger(value), {
      message: "Quantity must be an integer",
    }),
});

export default orderValidationSchema;
