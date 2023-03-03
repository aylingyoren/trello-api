import { DataTypes } from "sequelize";
import { sequelize } from "../../../config/sequelize";

export const Card = sequelize.define("card", {
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
  estimate: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING(255),
    allowNull: false,
    defaultValue: "to-be-done",
  },
  labels: DataTypes.ARRAY(DataTypes.STRING(50)),
  due_date: DataTypes.DATE,
});
