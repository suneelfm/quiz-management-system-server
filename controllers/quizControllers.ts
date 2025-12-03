import type { RequestHandler } from "express";
import { QuizModel } from "../models/quizModel";
import { QuestionModel } from "../models/questionsModel";
import { v4 } from "uuid";

export const getQuiz: RequestHandler<
  {
    quizId: string;
  },
  any,
  any,
  Record<string, any>
> = (req, res, next) => {
  try {
    QuizModel.findById(req.params.quizId)
      .lean()
      .then((data) => {
        res.status(200).send({
          data,
          message: "Quiz has fetched successfully.",
        });
      })
      .catch((error) => {
        res.status(500).send({ message: "Something went wrong" });
      });
  } catch (error) {
    next(error);
  }
};

export const getQuizzes: RequestHandler<{}, any, any, Record<string, any>> = (
  req,
  res,
  next
) => {
  QuizModel.aggregate([
    {
      $lookup: {
        from: "questions",
        localField: "_id",
        foreignField: "quizId",
        as: "questions",
      },
    },
    {
      $addFields: {
        noQuestions: { $size: "$questions" },
      },
    },
    {
      $unset: "questions",
    },
  ])
    .then((data) => {
      res.status(200).send({ data, message: "Quizzes fetched successfully." });
    })
    .catch((error) => {
      res.status(500).send({ message: "Something went wrong", error });
    });
};

export const createQuiz: RequestHandler<
  {},
  any,
  {
    quizTitle: string;
  },
  Record<string, any>
> = (req, res, next) => {
  try {
    const newQuiz = new QuizModel({ _id: v4(), ...req.body });
    newQuiz
      .save()
      .then((data) => {
        res
          .status(201)
          .send({ data, message: "Quiz has been created successfully." });
      })
      .catch((error) =>
        res
          .status(500)
          .send({ message: "Something went wrong while creating quiz.", error })
      );
  } catch (error) {
    next(error);
  }
};

export const updateQuiz: RequestHandler<
  {},
  any,
  { _id: string; quizTitle: string },
  Record<string, any>
> = (req, res, next) => {
  try {
    QuizModel.findOneAndUpdate({ _id: req.body._id }, req.body)
      .then(() =>
        res.status(200).send({ message: "Quiz Title updated successfully." })
      )
      .catch((error) =>
        res.status(500).send({ message: "Something went wrong", error })
      );
  } catch (error) {
    next(error);
  }
};

export const deleteQuiz: RequestHandler<
  {
    quizId: string;
  },
  any,
  any,
  Record<string, any>
> = (req, res, next) => {
  try {
    Promise.all([
      QuizModel.deleteOne({ _id: req.params.quizId }),
      QuestionModel.deleteMany({ quizId: req.params.quizId }),
    ])
      .then(() =>
        res.status(204).send({
          message: "Quiz and respective questions has be deleted successfully.",
        })
      )
      .catch((error) =>
        res.status(500).send({ message: "Something went wrong", error })
      );
  } catch (error) {
    next(error);
  }
};

export const submitQuiz: RequestHandler<
  {},
  any,
  { quizId: string; answers: { [key: string]: string } },
  Record<string, any>
> = (req, res, next) => {
  try {
    QuestionModel.find({ quizId: req.body.quizId })
      .then((data) => {
        let result = 0;
        let total = 0;
        data.forEach(({ _id, answer, marks }) => {
          if (req.body.answers[_id] === answer) {
            result += marks ?? 1;
          }
          total += marks ?? 1;
        });
        res.status(200).send({
          message: "You have successfully submitted your quiz.",
          result,
          total,
        });
      })
      .catch((error) =>
        res.status(500).send({ message: "Something went wrong", error })
      );
  } catch (error) {
    next(error);
  }
};
