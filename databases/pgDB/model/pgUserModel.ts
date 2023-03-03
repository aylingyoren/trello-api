import { DataTypes } from "sequelize";
import { sequelize } from "../../../config/sequelize";

export const User = sequelize.define("user", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING(255),
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  accesstoken: {
    type: DataTypes.STRING(255),
    allowNull: false,
    defaultValue: "",
  },
  roles: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
    defaultValue: ["user"],
  },
});
