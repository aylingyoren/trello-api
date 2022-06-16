import { Request, Response, NextFunction } from "express";
import express from "express";
const app = express();
import helmet from "helmet";
import cookieParser from "cookie-parser";

import logger from "./config/logger";
import rootRouter from "./routes/rootRouter";
import registerRouter from "./routes/registerRouter";
import authRouter from "./routes/authRouter";
import logoutRouter from "./routes/logoutRouter";
import verifyJWT from "./middleware/verifyJWT";
import boardsRouter from "./routes/api/boardsRouter";
import cardsRouter from "./routes/api/cardsRouter";
import errorHandler from "./middleware/errorHandler";

const PORT = process.env.PORT || 5005;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(express.static("static"));

app.use((req: Request, res: Response, next: NextFunction) => {
  logger.info(`${req.method} ${req.path}`);
  next();
});

app.use("/", rootRouter);
app.use("/register", registerRouter);
app.use("/auth", authRouter);
app.use("/logout", logoutRouter);

app.use(verifyJWT);
app.use("/api/boards", boardsRouter);
app.use("/api/cards", cardsRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
