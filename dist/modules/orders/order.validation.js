"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
// Zod validation schema for Order model
const orderValidationSchema = zod_1.z.object({
    email: zod_1.z.string().email("Invalid email format").nonempty("Email is required"),
    productId: zod_1.z
        .string()
        .length(24, "Product ID must be exactly 24 characters long")
        .nonempty("Product ID is required"),
    price: zod_1.z
        .number()
        .min(0, "Price must be a positive number")
        .refine((value) => Number.isInteger(value), {
        message: "Price must be an integer",
    }),
    quantity: zod_1.z
        .number()
        .min(0, "Quantity must be a non-negative number")
        .refine((value) => Number.isInteger(value), {
        message: "Quantity must be an integer",
    }),
});
exports.default = orderValidationSchema;
