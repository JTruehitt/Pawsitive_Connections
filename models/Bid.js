const sequelize = require("../config/connection");
const { Model, DataTypes } = require("sequelize");

class Bid extends Model {}

Bid.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    bidAmount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        max: 9999,
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
    lot_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "lot",
          key: "id",
        },
      },
  },
  {
    sequelize,
    freezeTableName: true,
    timestamps: true,
    underscored: true,
    modelName: "bid",
  }
);

module.exports = Bid;