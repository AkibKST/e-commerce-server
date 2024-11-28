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
exports.ProductControllers = void 0;
const product_service_1 = require("./product.service");
const product_validation_1 = __importDefault(require("./product.validation"));
//product create
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productData = req.body;
        // use zod parser
        const zodParseData = product_validation_1.default.parse(productData);
        const result = yield product_service_1.ProductServices.createProduct(zodParseData);
        res.status(200).json({
            success: true,
            message: "Product created successfully!",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Could not create product!",
            error: error,
        });
    }
});
//get all product
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchTerm = req.query.searchTerm;
        const result = yield product_service_1.ProductServices.getAllProducts(searchTerm);
        if (searchTerm) {
            res.status(200).json({
                success: true,
                message: `Product matching by search term ${searchTerm} successfully !`,
                data: result,
            });
        }
        else {
            res.status(200).json({
                success: true,
                message: "Product are fetched successfully !",
                data: result,
            });
        }
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Could not fetch product!",
            error: err,
        });
    }
});
//get product by single id
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const result = yield product_service_1.ProductServices.getProductById(productId);
        res.status(200).json({
            success: true,
            message: "Product are fetched successfully !",
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Could not fetch product!",
            error: err,
        });
    }
});
//delete a product by id
const deleteProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const result = yield product_service_1.ProductServices.deleteProduct(productId);
        res.status(200).json({
            success: true,
            message: "Product deleted successfully !",
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Could not delete product!",
            error: err,
        });
    }
});
//update a product by id
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const productData = req.body;
        //validate data using zod
        const zodParseData = product_validation_1.default.parse(productData);
        const updatedProduct = yield product_service_1.ProductServices.updateProduct(productId, zodParseData);
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
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Could not update product!",
            error: err,
        });
    }
});
exports.ProductControllers = {
    createProduct,
    getAllProducts,
    getProductById,
    deleteProductById,
    updateProduct,
};
