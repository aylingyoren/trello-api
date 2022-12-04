import mongoose from "mongoose";
import logger from "./logger";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI);
  } catch (err) {
    logger.error(err);
  }
};
