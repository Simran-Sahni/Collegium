import mongoose from "mongoose";
const Schema = mongoose.Schema;

const PollSchema = new Schema({
	author: {
		type: Schema.Types.ObjectId,
		ref: "User",
	},
	options: [
		{
			text,
			voteCount,
		},
	],
	tags: {
		type: [String],
	},
	date: {
		type: Date,
		default: Date.now(),
	},
});

export default mongoose.model("Poll", PollSchema);
