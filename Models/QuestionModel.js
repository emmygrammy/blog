import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
      trim: true,
    },

    options: {
      A: { type: String, required: true },
      B: { type: String, required: true },
      C: { type: String, required: true },
      D: { type: String, required: true },
    },

    correctAnswer: {
      type: String,
      enum: ["A", "B", "C", "D"],
      required: true,
    },

    explanation: {
      type: String,
    },

    subject: {
      type: String,
      default: "General",
    },

    year: {
      type: Number,
    },
  },
  { timestamps: true }
);

// Create unique index on question and year
questionSchema.index({ question: 1, year: 1 }, { unique: true });

export default mongoose.model("Question", questionSchema);