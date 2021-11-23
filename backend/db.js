import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const dbString = `mongodb+srv://${process.env.DB_ADMIN}:${process.env.DB_PASSWORD}@collegium.7ohxf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

//this because the new norm is using async await promises, since they look synchronous, even though in reality its async
const connectDB = async () => {
	try {
		await mongoose.connect(dbString, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});

		//There are even more properties of promise to this await, but we ll add them later

		console.log("MONGODB CONNECTED....!");
	} catch (err) {
		console.log(err);
		console.log(err.message);
		//Exit the process with failure code ie 1
		process.exit(1);
	}
};

export default connectDB;
