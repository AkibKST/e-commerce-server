import { TProduct } from "./product.interface";
import { Product } from "./product.model";

const createProduct = async (payLoad: TProduct) => {
  const result = await Product.create(payLoad);
  return result;
};

const getAllProducts = async (searchTerm?: string) => {
  const filterDoc: any = {};

  if (searchTerm) {
    filterDoc.$or = [
      { name: { $regex: searchTerm, $options: "i" } },
      { description: { $regex: searchTerm, $options: "i" } },
      { tags: { $regex: searchTerm, $options: "i" } },
    ];
  }

  const result = await Product.find(filterDoc);
  return result;
};

const getProductById = async (productId: string) => {
  const result = await Product.findById(productId);
  return result;
};

const deleteProduct = async (productId: string) => {
  const result = await Product.findByIdAndDelete(productId);
  return result;
};

const updateProduct = async (productId: string, payLoad: TProduct) => {
  const updatedProduct = await Product.findByIdAndUpdate(productId, payLoad, {
    new: true,
  });
  return updateProduct;
};

export const ProductServices = {
  createProduct,
  getAllProducts,
  getProductById,
  deleteProduct,
  updateProduct,
};
