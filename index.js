const express = require("express");
const app = express();
const helmet = require("helmet");
const cookieParser = require("cookie-parser");

const logger = require("./config/logger");
const rootRouter = require("./routes/rootRouter");
const registerRouter = require("./routes/registerRouter");
const authRouter = require("./routes/authRouter");
const logoutRouter = require("./routes/logoutRouter");
const verifyJWT = require("./middleware/verifyJWT");
const boardsRouter = require("./routes/api/boardsRouter");
const errorHandler = require("./middleware/errorHandler");

const PORT = process.env.PORT || 5005;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(express.static("static"));

app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path}`);
  next();
});

app.use("/", rootRouter);
app.use("/register", registerRouter);
app.use("/auth", authRouter);
app.use("/logout", logoutRouter);

app.use(verifyJWT);
app.use("/api/boards", boardsRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
