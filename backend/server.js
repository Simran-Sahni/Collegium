import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import connectDB  from "./db.js";
import groupRouter from "./routes/groups.js";
import postRouter from "./routes/posts.js";
import userRouter from "./routes/users.js";
const app = express();

//Connect to DB
connectDB();

//Initialize the Middleware
//this used to be app.use(bodyParser.json) earlier, now this functionality handled by Express
app.use(express.json({ limit: "30mb", extended: false }));
app.use(helmet());
app.use(cors());

app.use("/api-status", (req, res) => res.json("API Up & Running"));

app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/groups", groupRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("Server started on port " + PORT));
