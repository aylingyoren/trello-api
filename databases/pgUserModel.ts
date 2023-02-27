import { Model, Sequelize, DataTypes } from "sequelize";

export default class User extends Model {
  public id!: number;
  public username!: Date;
  public password!: string;
  public roles!: string[];
  public accesstoken!: string;
}
export const UserMap = (sequelize: Sequelize) => {
  User.init(
    {
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
    },
    {
      sequelize,
      tableName: "users",
      timestamps: false,
    }
  );
  User.sync();
};
