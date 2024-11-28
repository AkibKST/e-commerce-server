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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderControllers = void 0;
const order_validation_1 = __importDefault(require("./order.validation"));
const order_service_1 = require("./order.service");
const zod_1 = require("zod");
//create an order
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderData = req.body;
        const zodParseData = order_validation_1.default.parse(orderData);
        const result = yield order_service_1.OrderServices.createOrder(zodParseData);
        res.status(200).json({
            success: true,
            message: "Order created successfully",
            data: result,
        });
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            //zod error handaling
            res.status(400).json({
                success: false,
                message: "Validation failed",
                error,
            });
        }
        else {
            // outside error handaling
            res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    }
});
const getOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.query.email;
        const result = yield order_service_1.OrderServices.getOrders(email);
        if (email) {
            res.status(200).json({
                success: true,
                message: "Order fetched successfully for user email.",
                data: result,
            });
        }
        else {
            res.status(200).json({
                success: true,
                message: "Order fetched successfully",
                data: result,
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Order not found",
            error,
        });
    }
});
exports.OrderControllers = {
    createOrder,
    getOrders,
};
