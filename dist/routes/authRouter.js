"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authRouter = express_1.default.Router();
const authController_1 = __importDefault(require("../controllers/authController"));
const dataValidator_1 = __importDefault(require("../middleware/dataValidator"));
const schemas_1 = require("../model/schemas");
authRouter.post("/", (0, dataValidator_1.default)(schemas_1.UserSchema), authController_1.default);
exports.default = authRouter;
//# sourceMappingURL=authRouter.js.map