import mongoose from "mongoose";
import Question from "../Models/QuestionModel.js";



const connectDB = async () => {
  try {
    const conn = await mongoose.connect((process.env.MONGO_URI));
    console.log(`MongoDB Connected:`);

    // 👇 sync indexes AFTER connection
    await Question.syncIndexes();
    console.log("Question indexes synced");

  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

export default connectDB;