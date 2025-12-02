import express from "express";
import {
  createQuestion,
  deleteQuestion,
  getQuestions,
  updateQuestion,
} from "../controllers/questionsControllers";

const questionsRoutes = express.Router();

questionsRoutes.get("/:quizId", getQuestions);
questionsRoutes.post("", createQuestion);
questionsRoutes.put("", updateQuestion);
questionsRoutes.delete("/:questionId", deleteQuestion);

export default questionsRoutes;
