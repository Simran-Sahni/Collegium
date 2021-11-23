import mongoose from "mongoose";
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
	author: {
		type: Schema.Types.ObjectId,
		ref: "User",
	},
	text: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now(),
	},
});

export default mongoose.model("Comment", CommentSchema);
