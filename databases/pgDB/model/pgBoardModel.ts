import { Model, Sequelize, DataTypes } from "sequelize";

export default class Board extends Model {
  public id!: number;
  public name!: string;
  public color!: string;
  public description!: string;
}
export const BoardMap = (sequelize: Sequelize) => {
  Board.init(
    {
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
      created_at: {
        type: DataTypes.DATE,
        defaultValue: new Date(),
      },
    },
    {
      sequelize,
      tableName: "boards",
      timestamps: false,
    }
  );
  Board.sync();
};
