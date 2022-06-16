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
exports.getCard = exports.deleteCard = exports.updateCard = exports.createCard = exports.getAllCards = void 0;
const lodash_1 = __importDefault(require("lodash"));
let cards = require("../model/cards.json");
const logger_1 = __importDefault(require("../config/logger"));
const setCards = (data) => (cards = data);
const getAllCards = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield res.json(cards);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
        logger_1.default.error(err);
    }
});
exports.getAllCards = getAllCards;
const createCard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const lastCard = cards[cards.length - 1];
        const { name, description, estimate, status, dueDate, labels, boardId } = req.body;
        const newCard = {
            id: lodash_1.default.isEmpty(cards) ? 1 : lastCard.id + 1,
            name,
            description,
            createdAt: new Date().toISOString(),
            estimate,
            status,
            dueDate,
            labels,
            boardId: Number(boardId),
        };
        setCards([...cards, newCard]);
        yield res.status(201).json(cards);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
        logger_1.default.error(err);
    }
});
exports.createCard = createCard;
const updateCard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cardId } = req.params;
    try {
        const card = cards.find(({ id }) => id === Number(cardId));
        if (!card) {
            return res.status(400).json({ message: `Card ID ${cardId} not found` });
        }
        const { name, description, estimate, status, dueDate, labels } = req.body;
        if (name)
            card.name = name;
        if (description)
            card.description = description;
        if (estimate)
            card.estimate = estimate;
        if (status)
            card.status = status;
        if (dueDate)
            card.dueDate = dueDate;
        if (labels)
            card.labels = labels;
        const filteredArray = cards.filter(({ id }) => id !== Number(cardId));
        const unsortedArray = [...filteredArray, card];
        setCards(unsortedArray.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0)));
        res.json(cards);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
        logger_1.default.error(err);
    }
});
exports.updateCard = updateCard;
const deleteCard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cardId } = req.params;
    try {
        const card = cards.find(({ id }) => id === Number(cardId));
        if (!card) {
            return res.status(400).json({ message: `Card ID ${cardId} not found` });
        }
        const filteredArray = cards.filter(({ id }) => id !== card.id);
        setCards([...filteredArray]);
        res.json(cards);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
        logger_1.default.error(err);
    }
});
exports.deleteCard = deleteCard;
const getCard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cardId } = req.params;
    try {
        const card = cards.find(({ id }) => id === Number(cardId));
        if (!card) {
            return res.status(400).json({ message: `Card ID ${cardId} not found` });
        }
        yield res.json(card);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
        logger_1.default.error(err);
    }
});
exports.getCard = getCard;
//# sourceMappingURL=cardController.js.map