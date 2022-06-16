"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBoard = exports.deleteBoard = exports.updateBoard = exports.createBoard = exports.getAllBoards = void 0;
const lodash_1 = __importDefault(require("lodash"));
let boards = require("../model/board.json");
const logger_1 = __importDefault(require("../config/logger"));
const setBoards = (data) => (boards = data);
const getAllBoards = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield res.json(boards);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
        logger_1.default.error(err);
    }
});
exports.getAllBoards = getAllBoards;
const createBoard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const lastBoard = boards[boards.length - 1];
        const { name, color, description } = req.body;
        const newBoard = {
            id: lodash_1.default.isEmpty(boards) ? 1 : lastBoard.id + 1,
            name,
            color,
            description,
            createdAt: new Date().toISOString(),
        };
        setBoards([...boards, newBoard]);
        yield res.status(201).json(boards);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
        logger_1.default.error(err);
    }
});
exports.createBoard = createBoard;
const updateBoard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { boardId } = req.params;
    try {
        const board = boards.find(({ id }) => id === Number(boardId));
        if (!board) {
            return res.status(400).json({ message: `Board ID ${boardId} not found` });
        }
        const { name, color, description } = req.body;
        if (name)
            board.name = name;
        if (color)
            board.color = color;
        if (description)
            board.description = description;
        const filteredArray = boards.filter(({ id }) => id !== Number(boardId));
        const unsortedArray = [...filteredArray, board];
        setBoards(unsortedArray.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0)));
        res.json(boards);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
        logger_1.default.error(err);
    }
});
exports.updateBoard = updateBoard;
const deleteBoard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { boardId } = req.params;
    try {
        const board = boards.find(({ id }) => id === Number(boardId));
        if (!board) {
            return res.status(400).json({ message: `Board ID ${boardId} not found` });
        }
        const filteredArray = boards.filter(({ id }) => id !== board.id);
        setBoards([...filteredArray]);
        res.json(boards);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
        logger_1.default.error(err);
    }
});
exports.deleteBoard = deleteBoard;
const getBoard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { boardId } = req.params;
    try {
        const board = boards.find(({ id }) => id === Number(boardId));
        if (!board) {
            return res.status(400).json({ message: `Board ID ${boardId} not found` });
        }
        yield res.json(board);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
        logger_1.default.error(err);
    }
});
exports.getBoard = getBoard;
//# sourceMappingURL=boardController.js.map