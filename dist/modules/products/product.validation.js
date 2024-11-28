"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productValidationSchema = exports.inventoryValidationSchema = exports.variantValidationSchema = void 0;
const zod_1 = require("zod");
// Variant schema validation
exports.variantValidationSchema = zod_1.z.object({
    type: zod_1.z.string().nonempty("Type is required"),
    value: zod_1.z.string().nonempty("Value is required"),
});
// Inventory schema validation
exports.inventoryValidationSchema = zod_1.z.object({
    quantity: zod_1.z
        .number()
        .int()
        .min(0, "Quantity must be a non-negative integer")
        .nonnegative("Quantity cannot be negative"),
    inStock: zod_1.z.boolean(),
});
// Product schema validation
exports.productValidationSchema = zod_1.z.object({
    name: zod_1.z.string().nonempty("Name is required"),
    description: zod_1.z.string().nonempty("Description is required"),
    price: zod_1.z
        .number()
        .nonnegative("Price must be greater than or equal to 0")
        .min(0, "Price must be at least 0"),
    category: zod_1.z.string().nonempty("Category is required"),
    tags: zod_1.z
        .array(zod_1.z.string())
        .min(1, "At least one tag is required")
        .nonempty("Tags cannot be empty"),
    variants: zod_1.z
        .array(exports.variantValidationSchema)
        .min(1, "At least one variant is required")
        .nonempty("Variants cannot be empty"),
    inventory: exports.inventoryValidationSchema,
});
exports.default = exports.productValidationSchema;
