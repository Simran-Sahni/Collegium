import express from "express";

const router = express.Router();
import {
	getAllUsers,
	getSingleUser,
	loginUser,
	registerUser,
} from "../controllers/users.js";

router.get("/", getAllUsers);
router.get("/:id", getSingleUser);
router.post("/login", loginUser);
router.post("/register", registerUser);

export default router;
