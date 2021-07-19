import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

//Fetch all Products
// GET request to /api/products
//Public Acess
const getProducts = asyncHandler(async (req, res) => {
	const pageSize = 3;

	const page = Number(req.query.pageNumber) || 1;
	const keyword = req.query.keyword
		? {
				name: {
					$regex: req.query.keyword,
					$options: "i",
				},
		  }
		: {};

	const count = await Product.countDocuments({ ...keyword });
	const products = await Product.find({ ...keyword })
		.limit(pageSize)
		.skip(pageSize * (page - 1));
	res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

//Fetch a specific product according to the id Products
// GET request to /api/products/:id
//Public Acess

const getProductById = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);

	if (product) {
		res.json(product);
	} else {
		res.status(404);
		throw new Error("Product not found!!!");
	}
});

//Delete a specific product according to the id of Product
// DELETE request to /api/products/:id
//PRIVATE Access/Admin

const deleteProduct = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);

	if (product) {
		await product.remove();
		res.json({ message: "Product is removed" });
	} else {
		res.status(404);
		throw new Error("Product not found!!!");
	}
});

//create a product
// POST request to /api/products
//PRIVATE Access/Admin

const createProduct = asyncHandler(async (req, res) => {
	const product = new Product({
		name: "Sample name",
		price: 0,
		user: req.user._id,
		image: "/images/sample.jpg",
		brand: "Sample brand",
		category: "sample Category",
		InStock: 0,
		numReviews: 0,
		description: "sample decription",
	});

	const createdProduct = await product.save();
	res.status(201).json(createdProduct);
});

//update a product
// PUT request to /api/products/:id
//PRIVATE Access/Admin

const updateProduct = asyncHandler(async (req, res) => {
	const {
		name,
		price,
		description,
		image,
		brand,
		category,
		InStock,
	} = req.body;

	const product = await Product.findById(req.params.id);

	if (product) {
		product.name = name;
		product.price = price;
		product.description = description;
		product.image = image;
		product.brand = brand;
		product.category = category;
		product.InStock = InStock;

		const updatedProduct = await product.save();
		res.json(updatedProduct);
	} else {
		res.status(404);
		throw new Error("Product not found");
	}
});

//create new review
// POST request to /api/products/:id/review
//PRIVATE Access

const createProductReview = asyncHandler(async (req, res) => {
	const { rating, comment } = req.body;

	const product = await Product.findById(req.params.id);

	if (product) {
		const alreadyReviewed = product.reviews.find(
			(review) => review.user.toString() === req.user._id.toString()
		);
		if (alreadyReviewed) {
			res.status(400);
			throw new Error("Product already reviewd");
		}

		const review = {
			name: req.user.name,
			rating: Number(rating),
			comment,
			user: req.user._id,
		};

		product.reviews.push(review);
		product.numReviews = product.reviews.length;

		product.rating =
			product.reviews.reduce((acc, item) => item.rating + acc, 0) /
			product.reviews.length;

		await product.save();
		res.status(201).json({ message: "Successfully added review" });
	} else {
		res.status(404);
		throw new Error("Product not found");
	}
});

//Get toprated products
// GET request to /api/products/top
//Public Access

const getTopProducts = asyncHandler(async (req, res) => {
	const products = await Product.find({}).sort({ rating: -1 }).limit(3);

	res.json(products);
});

export {
	getProducts,
	getProductById,
	deleteProduct,
	createProduct,
	updateProduct,
	createProductReview,
	getTopProducts,
};
