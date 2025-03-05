import mongoose from "mongoose";
import "dotenv/config"

export async function connectDb() {
    await mongoose.connect(process.env.MONGO_URI)
}