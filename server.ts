import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import quizRoutes from "./routes/quizRoutes";
import { database } from "./dbConfig/index";
import questionsRoutes from "./routes/questionRoutes";

dotenv.config();
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

app.get("/", (req, res, next) => {
  res.send("Hello");
});

app.use("/quiz", quizRoutes);
app.use("/question", questionsRoutes);

database.on("error", console.error.bind(console, "MongoDB connection error:"));

app.listen(8081, () => console.log("App started"));
