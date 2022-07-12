import mongoose from "mongoose";

const boardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const BoardModel = mongoose.model("Board", boardSchema);

export const getAllBoardsDB = () => BoardModel.find();

export const createBoardDB = (board: Object) => BoardModel.create(board);

export const findBoardDB = (board: Object) => BoardModel.findOne(board).exec();
