import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response, NextFunction } from "express";
const app = express();
import helmet from "helmet";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";

import { connectDB } from "./config/mongoDBCon";
import { UserDatabase, UserDBType } from "./config/UserDatabase";
import { Database, DBType } from "./config/Database";
import { UserMongoDB } from "./databases/UserMongoDB";
import { BoardMongoDB } from "./databases/BoardMongoDB";
import { CardMongoDB } from "./databases/CardMongoDB";
import { UserPG } from "./databases/UserPG";
import { BoardPG } from "./databases/BoardPG";
import { CardPG } from "./databases/CardPG";
import { UserFileDB } from "./databases/UserFileDB";
import { BoardFileDB } from "./databases/BoardFileDB";
import { CardFileDB } from "./databases/CardFileDB";
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

let userDbClass: UserDBType;
let boardDbClass: DBType;
let cardDbClass: DBType;

switch (process.env.DATABASE) {
  case "MONGO":
    userDbClass = new UserDatabase(new UserMongoDB());
    boardDbClass = new Database(new BoardMongoDB());
    cardDbClass = new Database(new CardMongoDB());
    break;
  case "POSTGRES":
    userDbClass = new UserDatabase(new UserPG());
    boardDbClass = new Database(new BoardPG());
    cardDbClass = new Database(new CardPG());
    break;
  case "FILE":
    userDbClass = new UserDatabase(new UserFileDB());
    boardDbClass = new Database(new BoardFileDB());
    cardDbClass = new Database(new CardFileDB());
    break;
  default:
    console.log("Something went wrong");
}

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

export { userDbClass, boardDbClass, cardDbClass };
