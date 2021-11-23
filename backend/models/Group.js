import mongoose from "mongoose";
const Schema = mongoose.Schema;

const GroupSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	admin: {
		type: [
			{
				type: String,
			},
		],
		validate: [arrayLimit, " {PATH} must have atleast 1 admin "],
	},
	members: {
		type: [ {
			type: String,
		}],
		default: []
	},
	posts: [
		{
			type: Schema.Types.ObjectId,
			ref: "Post",
		},
	],
});

function arrayLimit(val) {
	return val.length >= 1;
}
export default mongoose.model("Group", GroupSchema);
