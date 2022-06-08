let boards = require("../model/board.json");

const setBoards = (data) => (boards = data);

const getAllBoards = async (req, res) => {
  try {
    await res.json(boards);
  } catch (err) {
    console.log(err);
  }
};

const createBoard = async (req, res) => {
  try {
    const { name, color, description } = req.body;
    const newBoard = {
      id: boards?.length ? boards[boards.length - 1].id + 1 : 1,
      name,
      color,
      description,
      createdAt: new Date().toISOString(),
    };
    setBoards([...boards, newBoard]);
    await res.status(201).json(boards);
  } catch (err) {
    console.log(err);
  }
};

const updateBoard = async (req, res) => {
  try {
    const board = boards.find((b) => b.id === parseInt(req.params.boardId));
    if (!board) {
      return res
        .status(400)
        .json({ message: `Board ID ${req.params.boardId} not found` });
    }
    const { name, color, description } = req.body;
    if (name) board.name = name;
    if (color) board.color = color;
    if (description) board.description = description;
    const filteredArray = boards.filter(
      (b) => b.id !== parseInt(req.params.boardId)
    );
    const unsortedArray = [...filteredArray, board];
    setBoards(
      unsortedArray.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0))
    );
    res.json(boards);
  } catch (err) {
    console.log(err);
  }
};

const deleteBoard = async (req, res) => {
  try {
    const board = boards.find((b) => b.id === parseInt(req.params.boardId));
    if (!board) {
      return res
        .status(400)
        .json({ message: `Board ID ${req.params.boardId} not found` });
    }
    const filteredArray = boards.filter((b) => b.id !== board.id);
    setBoards([...filteredArray]);
    res.json(boards);
  } catch (err) {
    console.log(err);
  }
};

const getBoard = async (req, res) => {
  try {
    const board = boards.find((b) => b.id === parseInt(req.params.boardId));
    if (!board) {
      return res
        .status(400)
        .json({ message: `Board ID ${req.params.boardId} not found` });
    }
    await res.json(board);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getAllBoards,
  createBoard,
  updateBoard,
  deleteBoard,
  getBoard,
};
