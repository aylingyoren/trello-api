"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const rootRouter = express_1.default.Router();
const logger_1 = __importDefault(require("../config/logger"));
rootRouter.get("/", (req, res) => {
    try {
        res.send(`<h1>Main Page</h1>`);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
        logger_1.default.error(err);
    }
});
exports.default = rootRouter;
//# sourceMappingURL=rootRouter.js.map