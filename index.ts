import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response, NextFunction } from "express";
const app = express();
import helmet from "helmet";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";

import { connectDB } from "./config/mongoDBCon";
import { sequelize } from "./config/sequelize";
import { Board } from "./databases/pgDB/model/pgBoardModel";
import { Card } from "./databases/pgDB/model/pgCardModel";
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

Board.hasMany(Card, { onDelete: "cascade" });
Card.belongsTo(Board);

sequelize
  .sync()
  .then(() => {})
  .catch((err) => console.log(err));

app.use("/", rootRouter);
app.use("/register", registerRouter);
app.use("/auth", authRouter);

app.use(verifyJWT);
app.use("/api/boards", boardsRouter);
app.use("/api/cards", cardsRouter);
app.use("/logout", logoutRouter);

app.use(errorHandler);

mongoose.connection.once("open", () => {
  logger.info("Connected to MongoDB");
  app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
  });
});
