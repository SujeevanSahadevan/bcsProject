import asyncHandler from "express-async-handler";
import generateToken from "../utilities/generateToken.js";
import User from "../models/userModel.js";

//Authenticate the user & get Tokens
//POST request to /api/users/login
//Public Acess
const authUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });

	if (user && (await user.matchPassword(password))) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			token: generateToken(user._id),
		});
	} else {
		res.status(401);
		throw new Error("Invalid Email or Password");
	}
});

//Register a new user
//POST request to /api/users
//Public Acess
const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body;

	const userExists = await User.findOne({ email });

	if (userExists) {
		res.status(400);
		throw new Error("user already exists");
	}

	const user = await User.create({
		name,
		email,
		password,
	});

	if (user) {
		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			token: generateToken(user._id),
		});
	} else {
		res.status(400);
		throw new Error("Invalid User Data");
	}
});

//GET user profile
//GET request to /api/users/profile
//Private Acess

const getUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);

	if (user) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
		});
	} else {
		res.status(404);
		throw new Error("User not found");
	}
	// const user = await User.findById(req.user._id);

	// if (user && (await user.matchPassword(password))) {
	// 	res.json({
	// 		_id: user._id,
	// 		name: user.name,
	// 		email: user.email,
	// 		isAdmin: user.isAdmin,
	// 		token: generateToken(user._id),
	// 	});
	// } else {
	// 	res.status(401);
	// 	throw new Error("Invalid Email or Password");
	// }
});

//UPDATE user profile
//PUT request to /api/users/profile
//Private Acess

const updateUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);

	if (user) {
		user.name = req.body.name || user.name;
		user.email = req.body.email || user.email;
		if (req.body.password) {
			user.password = req.body.password;
		}

		const updatedUser = await user.save();

		res.json({
			_id: updatedUser._id,
			name: updatedUser.name,
			email: updatedUser.email,
			isAdmin: updatedUser.isAdmin,
			token: generateToken(updatedUser._id),
		});
	} else {
		res.status(404);
		throw new Error("User not found");
	}
});

//GET all users
//GET request to /api/users
//Private/Admin Acess

const getUsers = asyncHandler(async (req, res) => {
	const users = await User.find({});
	res.json(users);
});

//Delete user
//DELETE request to /api/users/:id
//Private/Admin Acess

const deleteUser = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id);
	if (user) {
		await user.remove();
		res.json({ message: "User removed" });
	} else {
		res.status(404);
		throw new Error("User not found");
	}
});

//Get user by Id
//GET request to /api/users/:id
//Private/Admin Acess

const getUserById = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id).select("-password");
	if (user) {
		res.json(user);
	} else {
		res.status(404);
		throw new Error("User not found");
	}
});

//UPDATE user profile
//PUT request to /api/users/:id
//Private Acess/Admin

const updateUser = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id);

	if (user) {
		user.name = req.body.name || user.name;
		user.email = req.body.email || user.email;
		user.isAdmin = req.body.isAdmin;

		const updatedUser = await user.save();

		res.json({
			_id: updatedUser._id,
			name: updatedUser.name,
			email: updatedUser.email,
			isAdmin: updatedUser.isAdmin,
		});
	} else {
		res.status(404);
		throw new Error("User not found");
	}
});

export {
	authUser,
	getUserProfile,
	registerUser,
	updateUserProfile,
	getUsers,
	deleteUser,
	getUserById,
	updateUser,
};
