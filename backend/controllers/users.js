import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

const secret = `${process.env.myJWTsecret}`;

/**
 * TODO
 * getSingleUser
 * getAllUsers
 * loginUser
 * registerUser
 */

export const getSingleUser = async (req, res) => {
	try {
		const { id } = req.params;

		const user = await User.findById(id).select("-password");

		if (!user) {
			return res.status(401).json({ message: "User not found !" });
		}

		return res.status(200).json(user);
	} catch (error) {
		console.log(error);
		res
			.status(500)
			.json({ message: error.message, type: "Internal Server Error" });
	}
};

export const getAllUsers = async (req, res) => {
	try {
		const allUsers = await User.find().select("-password");
		return res.status(200).json(allUsers);
	} catch (error) {
		console.log(error);
		res
			.status(500)
			.json({ message: error.message, type: "Internal Server Error" });
	}
};

export const loginUser = async (req, res) => {
	const { email, password } = req.body;

	try {
		const oldUser = await User.findOne({ email });

		if (!oldUser)
			return res.status(404).json({ message: "User doesn't exist" });

		const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

		if (!isPasswordCorrect)
			return res.status(400).json({ message: "Invalid credentials" });

		const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
			expiresIn: "1h",
		});
		console.log(oldUser, token);
		res.status(200).json({ result: oldUser, token });
	} catch (err) {
		console.log(error);
		res.status(500).json({ message: "Something went wrong" });
	}
};

export const registerUser = async (req, res) => {
	const { email, password, firstName, lastName } = req.body;
	console.log('inside register', req.body);
	try {
		const oldUser = await User.findOne({ email });

		if (oldUser)
			return res.status(400).json({ message: "User already exists" });

		const hashedPassword = await bcrypt.hash(password, 12);

		const result = new User({
			email,
			password: hashedPassword,
			name: `${firstName} ${lastName}`,
			picture: ''
		});

		await result.save();

		console.log('result document object', result);
		const token = jwt.sign({ email: result.email, id: result._id }, secret, {
			expiresIn: "1h",
		});
		console.log(result, token);
		res.status(201).json({ result, token });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Something went wrong" });
	}
};
