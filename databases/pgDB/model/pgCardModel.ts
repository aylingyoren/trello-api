import { Model, Sequelize, DataTypes } from "sequelize";

export default class Card extends Model {
  public id!: number;
  public name!: string;
  public estimate!: string;
  public description!: string;
  public status!: string;
  public due_date!: Date;
  public labels!: string[];
  public board_id!: number;
}
export const CardMap = (sequelize: Sequelize) => {
  Card.init(
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
      board_id: {
        type: DataTypes.NUMBER,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: new Date(),
      },
      due_date: DataTypes.DATE,
    },
    {
      sequelize,
      tableName: "cards",
      timestamps: false,
    }
  );
  Card.sync();
};
