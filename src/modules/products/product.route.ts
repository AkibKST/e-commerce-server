import express, { Request, Response } from "express";
import { ProductControllers } from "./product.controller";

const router = express.Router();

// create a product
router.post("/", ProductControllers.createProduct);

//get all products
router.get("/", ProductControllers.getAllProducts);

//get single product by id
router.get("/:productId", ProductControllers.getAllProducts);

//delete a product
router.delete("/:productId");

export const ProductRoutes = router;
