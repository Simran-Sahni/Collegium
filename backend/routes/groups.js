import express from "express";

import {
	getGroups,
	getSingleGroup,
	getGroupsBySearch,
	addMember,
	removeMember,
	createGroup,
	addPost,
	addAdmin,
	giveUpAdmin,
	deletePost,
	deleteComment,
	joinGroup,
} from "../controllers/groups.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", getGroups);
router.get("/:id", getSingleGroup);
router.get("/search", getGroupsBySearch);

router.post("/", auth, createGroup);

router.patch("/:group_id/join", auth, joinGroup);
router.patch("/:group_id/post/:post_id", auth, addPost);

// Only admin moves
router.delete("/:group_id/post/:post_id", auth, deletePost);
router.delete(
	"/:group_id/post/:post_id/delete/:comment_id",
	auth,
	deleteComment
);
router.patch("/:group_id/add/:new_user_id", auth, addMember);
router.patch("/:group_id/remove/:user_id", auth, removeMember);

export default router;
