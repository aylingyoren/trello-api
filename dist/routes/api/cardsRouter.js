"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cardsRouter = express_1.default.Router();
const cardController_1 = require("../../controllers/cardController");
const roles_1 = __importDefault(require("../../config/roles"));
const verifyRoles_1 = __importDefault(require("../../middleware/verifyRoles"));
const dataValidator_1 = __importDefault(require("../../middleware/dataValidator"));
const schemas_1 = require("../../model/schemas");
cardsRouter
    .route("/")
    .get(cardController_1.getAllCards)
    .post((0, verifyRoles_1.default)(roles_1.default.ADMIN), (0, dataValidator_1.default)(schemas_1.CardSchema), cardController_1.createCard);
cardsRouter
    .route("/:cardId")
    .get(cardController_1.getCard)
    .put((0, verifyRoles_1.default)(roles_1.default.ADMIN), cardController_1.updateCard)
    .delete((0, verifyRoles_1.default)(roles_1.default.ADMIN), cardController_1.deleteCard);
exports.default = cardsRouter;
//# sourceMappingURL=cardsRouter.js.map