import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import quizRoutes from "./routes/quizRoutes.js";
import { database } from "./dbConfig/index.js";

dotenv.config();
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

app.get("/", (req, res, next) => {
  res.send("Hello");
});

database.on("error", console.error.bind(console, "MongoDB connection error:"));

app.listen(8081, () => console.log("App started"));
