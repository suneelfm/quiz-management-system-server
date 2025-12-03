import express from "express";
import {
  createQuiz,
  deleteQuiz,
  getQuiz,
  getQuizzes,
  submitQuiz,
  updateQuiz,
} from "../controllers/quizControllers";

const quizRoutes = express.Router();

quizRoutes.get("/:quizId", getQuiz);
quizRoutes.get("", getQuizzes);
quizRoutes.get("", getQuizzes);
quizRoutes.post("", createQuiz);
quizRoutes.put("", updateQuiz);
quizRoutes.delete("/:quizId", deleteQuiz);
quizRoutes.post("/submit", submitQuiz);

export default quizRoutes;
