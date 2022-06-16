"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const registerRouter = express_1.default.Router();
const registerController_1 = __importDefault(require("../controllers/registerController"));
const dataValidator_1 = __importDefault(require("../middleware/dataValidator"));
const schemas_1 = require("../model/schemas");
registerRouter.post("/", (0, dataValidator_1.default)(schemas_1.UserSchema), registerController_1.default);
exports.default = registerRouter;
//# sourceMappingURL=registerRouter.js.map