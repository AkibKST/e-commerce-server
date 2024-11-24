import { Request, Response } from "express";
import { ProductServices } from "./product.service";
import productValidationSchema from "./product.validation";

//product create
const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body;

    // use zod parser
    const zodParseData = productValidationSchema.parse(productData);

    const result = await ProductServices.createProduct(zodParseData);
    res.status(200).json({
      success: true,
      message: "Product created successfully!",
      data: result,
    });
  } catch (error: unknown) {
    res.status(500).json({
      success: false,
      message: "Could not create product!",
      error: error,
    });
  }
};

//get all product
const getAllProducts = async (req: Request, res: Response) => {
  try {
    const searchTerm: string = req.query.searchTerm as string;
    const result = await ProductServices.getAllProducts(searchTerm);

    if (searchTerm) {
      res.status(200).json({
        success: true,
        message: `Product matching by search term ${searchTerm} successfully !`,
        data: result,
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Product are fetched successfully !",
        data: result,
      });
    }
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
    const { productId } = req.params;
    const result = await ProductServices.getProductById(productId);

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

//delete a product by id
const deleteProductById = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.deleteProduct(productId);

    res.status(200).json({
      success: true,
      message: "Product deleted successfully !",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Could not delete product!",
      error: err,
    });
  }
};

//update a product by id
const updateProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const productData = req.body;

    //validate data using zod
    const zodParseData = productValidationSchema.parse(productData);

    const updatedProduct = await ProductServices.updateProduct(
      productId,
      zodParseData
    );

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found!",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully !",
      data: updatedProduct,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Could not update product!",
      error: err,
    });
  }
};

export const ProductControllers = {
  createProduct,
  getAllProducts,
  getProductById,
  deleteProductById,
  updateProduct,
};
