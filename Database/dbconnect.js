import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()

const dbconnect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Database connected")
    } catch (error) {
        console.error("Error connecting to database", error.message)
    }
}

export default dbconnect