let cards = require("../model/cards.json");
const logger = require("../config/logger");

const setCards = (data) => (cards = data);

const getAllCards = async (req, res) => {
  try {
    await res.json(cards);
  } catch (err) {
    logger.error(err);
  }
};

const createCard = async (req, res) => {
  try {
    const { name, description, estimate, status, dueDate, labels, boardId } =
      req.body;
    const newCard = {
      id: cards?.length ? cards[cards.length - 1].id + 1 : 1,
      name,
      description,
      createdAt: new Date().toISOString(),
      estimate,
      status,
      dueDate,
      labels,
      boardId: parseInt(boardId),
    };
    setCards([...cards, newCard]);
    await res.status(201).json(cards);
  } catch (err) {
    logger.error(err);
  }
};

const updateCard = async (req, res) => {
  try {
    const card = cards.find((c) => c.id === parseInt(req.params.cardId));
    if (!card) {
      return res
        .status(400)
        .json({ message: `Card ID ${req.params.cardId} not found` });
    }
    const { name, description, estimate, status, dueDate, labels } = req.body;
    if (name) card.name = name;
    if (description) card.description = description;
    if (estimate) card.estimate = estimate;
    if (status) card.status = status;
    if (dueDate) card.dueDate = dueDate;
    if (labels) card.labels = labels;
    const filteredArray = cards.filter(
      (c) => c.id !== parseInt(req.params.cardId)
    );
    const unsortedArray = [...filteredArray, card];
    setCards(
      unsortedArray.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0))
    );
    res.json(cards);
  } catch (err) {
    logger.error(err);
  }
};

const deleteCard = async (req, res) => {
  try {
    const card = cards.find((c) => c.id === parseInt(req.params.cardId));
    if (!card) {
      return res
        .status(400)
        .json({ message: `Card ID ${req.params.cardId} not found` });
    }
    const filteredArray = cards.filter((c) => c.id !== card.id);
    setCards([...filteredArray]);
    res.json(cards);
  } catch (err) {
    logger.error(err);
  }
};

const getCard = async (req, res) => {
  try {
    const card = cards.find((c) => c.id === parseInt(req.params.cardId));
    if (!card) {
      return res
        .status(400)
        .json({ message: `Card ID ${req.params.cardId} not found` });
    }
    await res.json(card);
  } catch (err) {
    logger.error(err);
  }
};

module.exports = { getAllCards, createCard, updateCard, deleteCard, getCard };
