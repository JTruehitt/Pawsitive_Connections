const sequelize = require("../config/connection");
const { Model, DataTypes } = require("sequelize");

class Pet extends Model {}

Pet.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
        len: [2, 20],
      },
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      validate: {
        len: [0, 30],
      },
      allowNull: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    needsHome: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    goodWithKids: {
      type: DataTypes.BOOLEAN,
    },
    image: {
      type: DataTypes.STRING,
      defaultValue: `/assets/profile_images/cat1.png`,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "pet",
    timestamps: true,
  }
);

module.exports = Pet;
