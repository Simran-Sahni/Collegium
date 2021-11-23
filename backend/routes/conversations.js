import express from "express";

import {
	getChats,
	getSingleChat,
	deleteChat,
	createChat,
} from "../controllers/conversations.js";

const router = express.Router();

router.get("/", getChats);
router.get("/:id", getSingleChat);

export default router;
