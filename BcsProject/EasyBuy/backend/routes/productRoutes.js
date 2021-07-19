import express from "express";
//import asyncHandler from "express-async-handler";
import {
	getProducts,
	getProductById,
	deleteProduct,
	createProduct,
	updateProduct,
	createProductReview,
	getTopProducts,
} from "../controllers/productController.js";
const router = express.Router();

import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").get(getProducts).post(protect, admin, createProduct);
router.route("/:id/reviews").post(protect, createProductReview);
router.get("/top", getTopProducts);

router
	.route("/:id")
	.get(getProductById)
	.delete(protect, admin, deleteProduct)
	.put(protect, admin, updateProduct);

//Fetch all Products
// GET request to /api/products
//Public Acess
// router.get(
// 	"/",
// 	asyncHandler(async (req, res) => {
// 		const products = await Product.find({});
// 		res.json(products);
// 	})
// );  controller will handle the functionalities

//Fetch a specific product according to the id Products
// GET request to /api/products/:id
//Public Acess

// router.get(
// 	"/:id",
// 	asyncHandler(async (req, res) => {
// 		const product = await Product.findById(req.params.id);

// 		if (product) {
// 			res.json(product);
// 		} else {
// 			res.status(404);
// 			throw new Error("Product not found!!!");
// 		}
// 	})
// );controller will handle the functionalities

export default router;
