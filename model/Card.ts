import mongoose from "mongoose";

const cardSchema = new mongoose.Schema({
  id: Number,
  name: {
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
  estimate: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  dueDate: {
    type: Date,
    default: new Date(),
  },
  labels: {
    type: [String],
    required: true,
  },
  boardId: {
    type: String,
    required: true,
  },
});

const CardModel = mongoose.model("Card", cardSchema);

export const getAllCardsDB = () => CardModel.find();

export const createCardDB = (card: Object) => CardModel.create(card);

export const findCardDB = (card: Object) => CardModel.findOne(card).exec();
