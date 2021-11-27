import express from "express";
import mongoose from "mongoose";
import Group from "../models/Group.js";
import Post from "../models/Post.js";
import Comment from "../models/Comment.js";
const router = express.Router();

import auth from "../middleware/auth.js";

export const createGroup = async (req, res) => {
	console.log("Create group called");
	try {
		//console.log(req.body, req.userId);
		const { name } = req.body;
		const oldGroup = await Group.find({ name });
		//console.log("oldGroup", oldGroup);
		if (oldGroup.length) {
			return res.status(401).json({
				message:
					"A group already exists with the same name. Use a different name ",
			});
		}

		const admin = [];
		admin.push(String(req.userId));

		const newGroup = new Group({
			name,
			admin,
		});

		const group = await newGroup.save();
		//console.log(group);
		return res
			.status(200)
			.json({ message: "Group Creation successful!", group });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

export const getGroups = async (req, res) => {
	const { page } = req.query;
	console.log("Get all groups called");
	try {
		const LIMIT = 8;
		const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page

		const total = await Group.countDocuments({});
		// console.log(total)
		const groups = await Group.find()
			.sort({ _id: -1 })
			.limit(LIMIT)
			.skip(startIndex);

		// console.log("All groups in getAllGroups", groups);

		return res.status(200).json({
			data: groups,
			currentPage: Number(page),
			numberOfPages: Math.ceil(total / LIMIT),
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Internal Server Error" });
	}
};
export const getSingleGroup = async (req, res) => {
	const { id } = req.params;
	try {
		console.log(typeof id, " is type of id string");
		console.log(id.length, id, "is length of the id string");
		const ID = new mongoose.Types.ObjectId(id).toHexString();
		// if (!mongoose.Types.ObjectId.isValid(ID)) {
		// 	console.log("Not a valid mongoose ID");
		// 	return res.status(404).json({ message: "Not a valid group ID" });
		// }
		const group = await Group.findOne({ _id: id });

		if (!group) {
			return res.status(404).json({ message: "This group doesnt exist!" });
		}

		return res.status(200).json(group);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Internal Server Error" });
	}
};
export const getGroupsBySearch = async (req, res) => {
	try {
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

export const addMember = async (req, res) => {
	const { group_id, new_user_id } = req.params;
	try {
		const group = await Group.findById(group_id);

		if (!group) {
			return res.status(404).json({ message: "This group doesnt exist!" });
		}

		const admins = group.admin;

		const index = admins.findIndex((id) => String(req.userId) === id);

		if (index === -1) {
			return res
				.status(401)
				.json({ message: "Sorry! You are not authorized to add members" });
		} else {
			group.members.push(new_user_id);
			await group.save();
			await Group.findByIdAndUpdate(group_id, group);

			return res.status(200).json({ group });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

export const removeMember = async (req, res) => {
	const { group_id, user_id } = req.params;
	try {
		const group = await Group.findById(id);

		if (!group) {
			return res.status(404).json({ message: "This group doesnt exist!" });
		}

		const admins = group.admin;

		const index = admins.findIndex((id) => String(req.userId) === id);

		if (index === -1) {
			return res
				.status(401)
				.json({ message: "Sorry! You are not authorized to remove members" });
		} else {
			group.members.filter((id) => id !== String(user_id));
			await group.save();
			await Group.findByIdAndUpdate(group_id, group);

			return res.status(200).json({ group });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

export const joinGroup = async (req, res) => {
	try {
		const { group_id } = req.params;
		const userId = req.userId;

		const group = await Group.findById(group_id);

		if (!group) {
			return res.status(404).json({ message: "This group doesnt exist!" });
		}

		if (group.members.includes(userId))
			return res
				.status(401)
				.json({ message: "You already are a member of this group!" });

		group.members.push(userId);

		const updatedGroup = await group.save();

		return res
			.status(200)
			.json({ message: "Joining group successful !", updatedGroup });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

export const addAdmin = async (req, res) => {
	try {
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Internal Server Error" });
	}
};
export const giveUpAdmin = async (req, res) => {
	try {
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Internal Server Error" });
	}
};
export const deletePost = async (req, res) => {
	const { group_id, post_id } = req.params;
	try {
		const group = await Group.findById(group_id);
		const post = await Post.findById(post_id);

		if (!group) {
			return res.status(404).json({ message: "This group doesnt exist!" });
		}

		if (!post) {
			return res.status(404).json({ message: "This post doesnt exist!" });
		}

		const admins = group.admin;

		const index = admins.findIndex((id) => String(req.userId) === id);

		if (index === -1) {
			return res
				.status(401)
				.json({ message: "Sorry! You are not authorized to delete this post" });
		} else {
			group.posts.filter((id) => id !== String(post_id));
			await Post.findByIdAndRemove(post_id);
			await group.save();
			await Group.findByIdAndUpdate(group_id, group);

			return res.status(200).json({ group });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

export const deleteComment = async (req, res) => {
	try {
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

export const addPost = async (req, res) => {
	const { group_id, post_id } = req.params;
	try {
		const group = await Group.findById(group_id);
		const post = await Post.findById(post_id);
		console.log("Post id", post_id);
		if (!group) {
			return res.status(404).json({ message: "This group doesnt exist!" });
		}

		if (!post) {
			console.log(post);
			return res.status(404).json({ message: "This post doesnt exist!" });
		}

		const index = group.posts.findIndex((id) => String(post_id) === id);

		if (index !== -1) {
			return res.status(401).json({ message: "Duplicate Post" });
		} else {
			group.posts.unshift(post_id);

			await group.save();
			await Group.findByIdAndUpdate(group_id, group);

			return res.status(200).json({ group });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Internal Server Error" });
	}
};
