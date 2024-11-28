import { Request, Response } from "express";
import orderValidationSchema from "./order.validation";
import { OrderServices } from "./order.service";
import { z } from "zod";

//create an order
const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;
    const zodParseData = orderValidationSchema.parse(orderData);

    const result = await OrderServices.createOrder(zodParseData);

    res.status(200).json({
      success: true,
      message: "Order created successfully",
      data: result,
    });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      //zod error handaling
      res.status(400).json({
        success: false,
        message: "Validation failed",
        error,
      });
    } else {
      // outside error handaling
      res.status(400).json({
        success: false,
        message: (error as Error).message,
      });
    }
  }
};

const getOrders = async (req: Request, res: Response) => {
  try {
    const email: string = req.query.email as string;
    const result = await OrderServices.getOrders(email);

    if (email) {
      res.status(200).json({
        success: true,
        message: "Order fetched successfully for user email.",
        data: result,
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Order fetched successfully",
        data: result,
      });
    }
  } catch (error: unknown) {
    res.status(500).json({
      success: false,
      message: "Order not found",
      error,
    });
  }
};

export const OrderControllers = {
  createOrder,
  getOrders,
};
