"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderServices = void 0;
const product_model_1 = require("../products/product.model");
const order_model_1 = require("./order.model");
//create an order
const createOrder = (order) => __awaiter(void 0, void 0, void 0, function* () {
    const orderId = order.productId;
    const ProductData = yield product_model_1.Product.findById(orderId);
    const updateQuantity = (ProductData === null || ProductData === void 0 ? void 0 : ProductData.inventory.quantity) - order.quantity;
    if (!ProductData) {
        throw new Error("Could not found the product");
    }
    else {
        if (ProductData.inventory.inStock &&
            ProductData.inventory.quantity > 0 &&
            ProductData.inventory.quantity >= order.quantity) {
            const result = yield order_model_1.Order.create(order);
            const updateData = yield product_model_1.Product.updateOne({ _id: ProductData.id }, {
                "inventory.quantity": updateQuantity,
                "inventory.inStock": updateQuantity > 0,
            });
            console.log(updateData);
            return result;
        }
        else {
            throw new Error("Insufficient quantity in inventory");
        }
    }
});
const getOrders = (email) => __awaiter(void 0, void 0, void 0, function* () {
    //eslint-disable-next-line
    const filter = {};
    if (email) {
        filter.email = email;
    }
    const result = yield order_model_1.Order.find(filter);
    return result;
});
exports.OrderServices = {
    createOrder,
    getOrders,
};
