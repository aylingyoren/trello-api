"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const helmet_1 = __importDefault(require("helmet"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const logger_1 = __importDefault(require("./config/logger"));
const rootRouter_1 = __importDefault(require("./routes/rootRouter"));
const registerRouter_1 = __importDefault(require("./routes/registerRouter"));
const authRouter_1 = __importDefault(require("./routes/authRouter"));
const logoutRouter_1 = __importDefault(require("./routes/logoutRouter"));
const verifyJWT_1 = __importDefault(require("./middleware/verifyJWT"));
const boardsRouter_1 = __importDefault(require("./routes/api/boardsRouter"));
const cardsRouter_1 = __importDefault(require("./routes/api/cardsRouter"));
const errorHandler_1 = __importDefault(require("./middleware/errorHandler"));
const PORT = process.env.PORT || 5005;
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, helmet_1.default)());
app.use(express_1.default.static("static"));
app.use((req, res, next) => {
    logger_1.default.info(`${req.method} ${req.path}`);
    next();
});
app.use("/", rootRouter_1.default);
app.use("/register", registerRouter_1.default);
app.use("/auth", authRouter_1.default);
app.use("/logout", logoutRouter_1.default);
app.use(verifyJWT_1.default);
app.use("/api/boards", boardsRouter_1.default);
app.use("/api/cards", cardsRouter_1.default);
app.use(errorHandler_1.default);
app.listen(PORT, () => {
    logger_1.default.info(`Server running on port ${PORT}`);
});
//# sourceMappingURL=index.js.map