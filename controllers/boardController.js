const _ = require("lodash");
let boards = require("../model/board.json");
const logger = require("../config/logger");

const setBoards = (data) => (boards = data);

const getAllBoards = async (req, res) => {
  try {
    await res.json(boards);
  } catch (err) {
    res.status(500).json({ message: err.message });
    logger.error(err);
  }
};

const createBoard = async (req, res) => {
  try {
    const lastBoard = boards[boards.length - 1];
    const { name, color, description } = req.body;
    const newBoard = {
      id: _.isEmpty(boards) ? 1 : lastBoard.id + 1,
      name,
      color,
      description,
      createdAt: new Date().toISOString(),
    };
    setBoards([...boards, newBoard]);
    await res.status(201).json(boards);
  } catch (err) {
    res.status(500).json({ message: err.message });
    logger.error(err);
  }
};

const updateBoard = async (req, res) => {
  const { boardId } = req.params;
  try {
    const board = boards.find(({ id }) => id === Number(boardId));
    if (!board) {
      return res.status(400).json({ message: `Board ID ${boardId} not found` });
    }
    const { name, color, description } = req.body;
    if (name) board.name = name;
    if (color) board.color = color;
    if (description) board.description = description;
    const filteredArray = boards.filter(({ id }) => id !== Number(boardId));
    const unsortedArray = [...filteredArray, board];
    setBoards(
      unsortedArray.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0))
    );
    res.json(boards);
  } catch (err) {
    res.status(500).json({ message: err.message });
    logger.error(err);
  }
};

const deleteBoard = async (req, res) => {
  const { boardId } = req.params;
  try {
    const board = boards.find(({ id }) => id === Number(boardId));
    if (!board) {
      return res.status(400).json({ message: `Board ID ${boardId} not found` });
    }
    const filteredArray = boards.filter(({ id }) => id !== board.id);
    setBoards([...filteredArray]);
    res.json(boards);
  } catch (err) {
    res.status(500).json({ message: err.message });
    logger.error(err);
  }
};

const getBoard = async (req, res) => {
  const { boardId } = req.params;
  try {
    const board = boards.find(({ id }) => id === Number(boardId));
    if (!board) {
      return res.status(400).json({ message: `Board ID ${boardId} not found` });
    }
    await res.json(board);
  } catch (err) {
    res.status(500).json({ message: err.message });
    logger.error(err);
  }
};

module.exports = {
  getAllBoards,
  createBoard,
  updateBoard,
  deleteBoard,
  getBoard,
};
