import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  quizTitle: { type: String, required: true },
});

export const QuizModel = mongoose.model("quizzes", quizSchema);
