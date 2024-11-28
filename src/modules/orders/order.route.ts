import express from "express";
import { OrderControllers } from "./order.controllers";

const router = express.Router();

//create an order
router.post("/", OrderControllers.createOrder);

//get all orders or email search
router.get("/", OrderControllers.getOrders);

export const OrderRoutes = router;
