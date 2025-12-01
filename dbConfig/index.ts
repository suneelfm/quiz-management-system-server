import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("DB has been connected"))
  .catch((error) => console.error(`DB connection error ${error.message}`));

export const database = mongoose.connection;
