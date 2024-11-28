"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = exports.orderSchema = void 0;
const mongoose_1 = require("mongoose");
exports.orderSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: [true, "Email is requied"],
    },
    productId: {
        type: String,
        required: [true, "Product ID is requied"],
        minlength: [24, "Product ID must be 24 characters long"],
    },
    price: {
        type: Number,
        required: [true, "Price is requied"],
        min: [0, "Price must be a positive integer"],
    },
    quantity: {
        type: Number,
        required: [true, "Quantity is requied"],
        min: [0, "Quantity must be a non-negetive integer"],
    },
});
exports.Order = (0, mongoose_1.model)("Order", exports.orderSchema);
