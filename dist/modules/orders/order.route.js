"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRoutes = void 0;
const express_1 = __importDefault(require("express"));
const order_controllers_1 = require("./order.controllers");
const router = express_1.default.Router();
//create an order
router.post("/", order_controllers_1.OrderControllers.createOrder);
//get all orders or email search
router.get("/", order_controllers_1.OrderControllers.getOrders);
exports.OrderRoutes = router;
