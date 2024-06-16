import { Request, Response } from "express";
import { ProductServices } from "./product.service";

//product create
const createProduct = async (req: Request, res: Response) => {
  const productData = req.body;

  const result = await ProductServices.createProduct(productData);
  res.json({
    success: true,
    message: "Product created successfully!",
    data: result,
  });
};

//get all product
const getAllProducts = async (req: Request, res: Response) => {
  try {
    const result = await ProductServices.getAllProducts();

    res.status(200).json({
      success: true,
      message: "Product are fetched successfully !",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Could not fetch product!",
      error: err,
    });
  }
};

//get product by single id
const getProductById = async (req: Request, res: Response) => {
  try {
    const productId = req.params;
    const result = await ProductServices.getProductById(productId);

    res.status(200).json({
      success: true,
      message: "Movies are fetched successfully !",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Could not fetch movies!",
      error: err,
    });
  }
};

export const ProductControllers = {
  createProduct,
  getAllProducts,
  getProductById,
};
