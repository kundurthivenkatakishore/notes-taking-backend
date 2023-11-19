import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()

const connectDB = async () => {
    try {
        const dbName = 'notes-taking-app';
        const conn = await mongoose.connect(`${process.env.MONGO_URL}/${dbName}`);
        console.log(`MongoDB Connected`);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

export default connectDB;