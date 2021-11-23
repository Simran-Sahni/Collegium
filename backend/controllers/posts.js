/**
 * TODO
 *  
  like & unlike post logic to be rechecked
 
 */

import express from "express";
import mongoose from "mongoose";
import Post from "../models/Post.js";
import Comment from "../models/Comment.js";
const router = express.Router();

export const getPosts = async (req, res) => {
	const { page } = req.query;
	try {
		const LIMIT = 8;
		const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page

		const total = await Post.countDocuments({});
		const allPosts = await Post.find()
			.sort({ _id: -1 })
			.limit(LIMIT)
			.skip(startIndex);

		return res.status(200).json({
			data: allPosts,
			currentPage: Number(page),
			numberOfPages: Math.ceil(total / LIMIT),
		});
	} catch (error) {
		console.log(error);
		res
			.status(500)
			.json({ message: error.message, type: "Internal Server Error" });
	}
};

export const getPostsBySearch = async (req, res) => {
	const { searchQuery, tags } = req.query;

	try {
		const title = new RegExp(searchQuery, "i");

		const posts = await Post.find({
			$or: [{ title }, { tags: { $in: tags.split(",") } }],
		});

		return res.json({ data: posts });
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const getSinglePost = async (req, res) => {
	const { id } = req.params;
	try {
		const post = await Post.findById(id);
		if (!post) {
			return res.status(401).json({ message: "Post not found" });
		}
		console.log(post);
		return res.status(200).json(post);
	} catch (error) {
		console.log(error);
		res
			.status(500)
			.json({ message: error.message, type: "Internal Server Error" });
	}
};

export const addPost = async (req, res) => {
	const { text, name, picture, tags } = req.body;
	console.log("request body : ", req.body);
	try {
		console.log("UserId of request", typeof req.userId);
		const author = String(req.userId);

		const newPost = new Post({
			author,
			name,
			text,
			picture,
			tags,
		});

		const post = await newPost.save();

		return res.status(200).json({ message: "Post created successfully", post });
	} catch (error) {
		console.log(error);
		res
			.status(500)
			.json({ message: error.message, type: "Internal Server Error" });
	}
};

export const updatePost = async (req, res) => {
	const { id } = req.params;
	const { author, text, date, comments, picture, tags } = req.body;
	try {
		const post = await Posts.findById(id);
		if (!post) {
			return res.status(401).json({ msg: "Post not found" });
		}
		const updatedPost = {
			author,
			text,
			date,
			comments,
			picture,
			tags,
			_id: id,
		};

		await Post.findByIdAndUpdate(id, updatedPost);

		return res
			.status(200)
			.json({ message: "Post updated successfully", post: updatedPost });
	} catch (error) {
		console.log(error);
		res
			.status(500)
			.json({ message: error.message, type: "Internal Server Error" });
	}
};

export const deletePost = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id))
		return res.status(404).send(`No post with id: ${id}`);

	await PostMessage.findByIdAndRemove(id);

	res.json({ message: "Post deleted successfully." });
};

export const likePost = async (req, res) => {
  const { id } = req.params;

  if (!req.userId) {
    return res.json({ message: "Unauthenticated" });
  }

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const post = await PostMessage.findById(id);

  const index = post.likes.findIndex((id) => id === String(req.userId));

  if (index === -1) {
    post.likes.push(req.userId);
  } else {
    post.likes = post.likes.filter((id) => id !== String(req.userId));
  }

  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
    new: true,
  });

  res.status(200).json(updatedPost);
};

export const addComment = async (req, res) => {
	const { post_id } = req.params;
	const { text } = req.body;
	try {
		const user = await User.findById(req.userId).select("-password");
		const post = await Posts.findById(post_id);
		if (!post) {
			return res.status(401).json({ message: "Post not found" });
		}
		if (!user) {
			return res.status(401).json({
				message: "User not authorized ! Please login/sign up to comment",
			});
		}

		const newComment = new Comment({
			author: user._id,
			text,
		});

		const comment = await newComment.save();

		await Post.findByIdAndUpdate(id, {
			comments: post.comments.unshift(comment),
		});

		return res.status(200).json({
			message: "Comment added successfully",
			"Updated post": updatedPost,
		});
	} catch (error) {
		console.log(error);
		res
			.status(500)
			.json({ message: error.message, type: "Internal Server Error" });
	}
};

export const deleteComment = async (req, res) => {
	const { post_id, comment_id } = req.params;

	try {
		if (!mongoose.Types.ObjectId.isValid(post_id))
			return res.status(404).send(`No post with id: ${id}`);

		if (!mongoose.Types.ObjectId.isValid(comment_id))
			return res.status(404).send(`No comment with id: ${id}`);

		const post = await Post.findById(post_id);

		post.comments = post.comments.filter((id) => id !== comment_id);

		await Post.findByIdAndUpdate(post_id, post);
		await Comment.findByIdAndRemove(id);

		res.json({ message: "Comment deleted successfully." });
	} catch (error) {
		console.log(error);
		res
			.status(500)
			.json({ message: error.message, type: "Internal Server Error" });
	}
};
