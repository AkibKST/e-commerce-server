import { model, Schema } from "mongoose";
import { TOrder } from "./order.interface";

export const orderSchema: Schema = new Schema<TOrder>({
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

export const Order = model<TOrder>("Order", orderSchema);
