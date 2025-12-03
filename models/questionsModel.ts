import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  quizId: { type: String, required: true },
  questionStatement: { type: String, required: true },
  options: { type: [{ type: String }] },
  answer: { type: String, required: true },
  questionType: { type: String, required: true },
  marks: { type: Number, required: true },
});

export const QuestionModel = mongoose.model("questions", questionSchema);
