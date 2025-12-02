import type { RequestHandler } from "express";
import { QuestionModel } from "../models/questionsModel";
import { v4 } from "uuid";

export const getQuestions: RequestHandler<
  {
    quizId: string;
  },
  any,
  any,
  Record<string, any>
> = (req, res, next) => {
  try {
    QuestionModel.find({ quizId: req.params.quizId })
      .then((data) => {
        res
          .status(200)
          .send({ data, message: "Questions fetched successfully." });
      })
      .catch((error) => {
        res.status(500).send({ message: "Something went wrong", error });
      });
  } catch (error) {
    next(error);
  }
};

export const createQuestion: RequestHandler<
  {},
  any,
  {
    quizId: string;
    questionStatement: string;
    questionType: string;
    options: string[];
    answer: string;
  },
  Record<string, any>
> = (req, res, next) => {
  try {
    const newQuestion = new QuestionModel({ _id: v4(), ...req.body });
    newQuestion
      .save()
      .then((data) => {
        res
          .status(201)
          .send({ data, message: "Question has created successfully." });
      })
      .catch((error) => {
        res.status(500).send({ message: "Something went wrong", error });
      });
  } catch (error) {
    next(error);
  }
};

export const updateQuestion: RequestHandler<
  {},
  any,
  {
    _id: string;
    quizId: string;
    questionStatement: string;
    questionType: string;
    options: string[];
    answer: string;
  },
  Record<string, any>
> = (req, res, next) => {
  try {
    QuestionModel.findOneAndUpdate({ _id: req.body._id }, req.body)
      .then(() =>
        res
          .status(200)
          .send({ message: "Question has been updated Successfully." })
      )
      .catch((error) =>
        res.status(500).send({ message: "Something went wrong.", error })
      );
  } catch (error) {
    next(error);
  }
};

export const deleteQuestion: RequestHandler<
  {
    questionId: string;
  },
  any,
  any,
  Record<string, any>
> = (req, res, next) => {
  try {
    QuestionModel.findByIdAndDelete(req.params.questionId)
      .then(() =>
        res
          .status(204)
          .send({ message: "Message has been delete successfully." })
      )
      .catch((error) =>
        res.status(500).send({ message: "Something went wrong.", error })
      );
  } catch (error) {
    next(error);
  }
};
