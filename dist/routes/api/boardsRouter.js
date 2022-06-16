"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const boardsRouter = express_1.default.Router();
const boardController_1 = require("../../controllers/boardController");
const roles_1 = __importDefault(require("../../config/roles"));
const verifyRoles_1 = __importDefault(require("../../middleware/verifyRoles"));
const dataValidator_1 = __importDefault(require("../../middleware/dataValidator"));
const schemas_1 = require("../../model/schemas");
boardsRouter
    .route("/")
    .get(boardController_1.getAllBoards)
    .post((0, verifyRoles_1.default)(roles_1.default.ADMIN), (0, dataValidator_1.default)(schemas_1.BoardSchema), boardController_1.createBoard);
boardsRouter
    .route("/:boardId")
    .get(boardController_1.getBoard)
    .put((0, verifyRoles_1.default)(roles_1.default.ADMIN), boardController_1.updateBoard)
    .delete((0, verifyRoles_1.default)(roles_1.default.ADMIN), boardController_1.deleteBoard);
exports.default = boardsRouter;
//# sourceMappingURL=boardsRouter.js.map