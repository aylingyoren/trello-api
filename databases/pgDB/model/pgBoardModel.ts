import { DataTypes } from "sequelize";
import { sequelize } from "./pgIndex";

export const Board = sequelize.define("board", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  color: DataTypes.STRING(50),
  description: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
});
