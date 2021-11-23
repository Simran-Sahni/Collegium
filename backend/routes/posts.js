// Routes for both Posts & Comments
import express from "express";

import {
  getPosts,
  getSinglePost,
  addPost,
  updatePost,
  deletePost,
  addComment,
  deleteComment,
  likePost,
  getPostsBySearch
} from "../controllers/posts.js";

import auth from "../middleware/auth.js";
const router = express.Router();

router.get("/", getPosts);
router.post("/", auth, addPost);
router.get("/search", auth, getPostsBySearch);

router.get("/:id", auth, getSinglePost);

router.patch("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);
router.patch("/:id/like", auth, likePost);

router.post("/:post_id/comment", auth, addComment );
router.delete("/:post_id/comment/:comment_id", auth, deleteComment);

export default router;
