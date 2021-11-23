import mongoose from "mongoose";
const Schema = mongoose.Schema;

const PostSchema = new Schema({
	author: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	text: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now(),
	},
	likes: { type: [String], default: [] },
	comments: {
		type: [
			{
				type: Schema.Types.ObjectId,
				ref: "comment",
			},
		],
		default: [],
	},
	picture: {
		type: String,
	},
	tags: [String],
});

export default mongoose.model("Post", PostSchema);
