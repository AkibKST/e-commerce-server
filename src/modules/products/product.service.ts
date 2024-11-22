import { TProduct } from "./product.interface";
import { Product } from "./product.model";

const createProduct = async (payLoad: TProduct) => {
  const result = await Product.create(payLoad);
  return result;
};

const getAllProducts = async () => {
  const result = await Product.find();
  return result;
};

const getProductById = async (productId: any) => {
  const result = await Product.findById(productId);
  return result;
};

export const ProductServices = {
  createProduct,
  getAllProducts,
  getProductById,
};
