"use strict";
const { isAfter } = require("date-fns");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Task.belongsTo(models.User, {
        foreignKey: "userId",
      });
    }
  }
  Task.init(
    {
      content: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      isDone: {
        field: "is_done",
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        validate: {
          notNull: true,
        },
      },
      deadLine: {
        field: "dead_line",
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          isDate: true,
          isValidDate(value) {
            if (isAfter(new Date(), new Date(value))) {
              throw new Error("Fail!!!!!Chek your dead line");
            }
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Task",
      tableName: "tasks",
      underscored: true,
    }
  );
  return Task;
};
