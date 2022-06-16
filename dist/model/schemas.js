"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardSchema = exports.BoardSchema = exports.UserSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.UserSchema = joi_1.default.object().keys({
    name: joi_1.default.string().alphanum().min(3).max(50).required(),
    pwd: joi_1.default.string().min(8).max(50).required(),
});
exports.BoardSchema = joi_1.default.object().keys({
    id: joi_1.default.number().integer(),
    name: joi_1.default.string().alphanum().min(3).max(50).required(),
    color: joi_1.default.string().alphanum().min(3).max(100).required(),
    description: joi_1.default.string().max(300).required(),
    createdAt: joi_1.default.date(),
});
exports.CardSchema = joi_1.default.object().keys({
    id: joi_1.default.number().integer(),
    name: joi_1.default.string().min(3).max(50).required(),
    description: joi_1.default.string().max(300).required(),
    createdAt: joi_1.default.date(),
    estimate: joi_1.default.string().min(3).max(50).required(),
    status: joi_1.default.string().alphanum().min(3).max(50).required(),
    dueDate: joi_1.default.string().required(),
    labels: joi_1.default.array().items(joi_1.default.string().alphanum().min(3).max(50)).required(),
    boardId: joi_1.default.number().integer().required(),
});
//# sourceMappingURL=schemas.js.map