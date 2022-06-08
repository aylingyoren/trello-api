let cards = require("../model/cards.json");

const setCards = (data) => (cards = data);

const getAllCards = async (req, res) => {
  try {
    const selectedCards = cards.filter(
      (c) => c.boardId === parseInt(req.params.boardId)
    );
    await res.json(selectedCards);
  } catch (err) {
    console.log(err);
  }
};

const createCard = async (req, res) => {
  try {
    const { name, description, estimate, status, dueDate, labels } = req.body;
    const boardId = parseInt(req.params.boardId);
    const newCard = {
      id: cards?.length ? cards[cards.length - 1].id + 1 : 1,
      name,
      description,
      createdAt: new Date().toISOString(),
      estimate,
      status,
      dueDate,
      labels,
      boardId,
    };
    if (
      !newCard.name ||
      !newCard.estimate ||
      !newCard.description ||
      !newCard.dueDate ||
      !newCard.labels ||
      !newCard.status
    ) {
      return res.status(400).json({
        message:
          "Name, description, estimate, status, dueDate and labels are required.",
      });
    }
    if (!boardId) return res.sendStatus(404);
    setCards([...cards, newCard]);
    await res.status(201).json(cards);
  } catch (err) {
    console.log(err);
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
    const boardId = parseInt(req.params.boardId);
    if (!boardId) return res.sendStatus(404);
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
    console.log(err);
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
    const boardId = parseInt(req.params.boardId);
    if (!boardId) return res.sendStatus(404);
    const filteredArray = cards.filter((c) => c.id !== card.id);
    setCards([...filteredArray]);
    res.json(cards);
  } catch (err) {
    console.log(err);
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
    const boardId = parseInt(req.params.boardId);
    if (!boardId) return res.sendStatus(404);
    await res.json(card);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getAllCards, createCard, updateCard, deleteCard, getCard };
