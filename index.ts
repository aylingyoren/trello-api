import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response, NextFunction } from "express";
const app = express();
import helmet from "helmet";
import { sequelize } from "./databases/pgDB/model/pgIndex";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";

import { connectDB } from "./config/mongoDBCon";
import rootRouter from "./routes/rootRouter";
import registerRouter from "./routes/registerRouter";
import authRouter from "./routes/authRouter";
import logoutRouter from "./routes/logoutRouter";
import verifyJWT from "./middleware/verifyJWT";
import boardsRouter from "./routes/api/boardsRouter";
import cardsRouter from "./routes/api/cardsRouter";
import errorHandler from "./middleware/errorHandler";
import logger from "./config/logger";

const PORT = process.env.PORT || 5005;

connectDB();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(express.static("static"));

app.use((req: Request, res: Response, next: NextFunction) => {
  logger.info(`${req.method} ${req.path}`);
  next();
});

// app.use((req: Request, res: Response, next: NextFunction) => {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

sequelize.sync().then(() => {
  console.log("db has been synced");
});

app.use("/", rootRouter);
app.use("/register", registerRouter);
app.use("/auth", authRouter);
app.use("/logout", logoutRouter);

app.use(verifyJWT);
app.use("/api/boards", boardsRouter);
app.use("/api/cards", cardsRouter);

app.use(errorHandler);

mongoose.connection.once("open", () => {
  logger.info("Connected to MongoDB");
  app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
  });
});
