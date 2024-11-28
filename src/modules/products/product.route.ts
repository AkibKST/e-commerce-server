import express from "express";
import { ProductControllers } from "./product.controller";

const router = express.Router();

// create a product
router.post("/", ProductControllers.createProduct);

//get all products
router.get("/", ProductControllers.getAllProducts);

//get single product by id
router.get("/:productId", ProductControllers.getAllProducts);

//delete product by id
router.delete("/:productId", ProductControllers.deleteProductById);

//update product by id
router.put("/:productId", ProductControllers.updateProduct);

export const ProductRoutes = router;
