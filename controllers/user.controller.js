const { Op } = require("sequelize");
const _ = require("lodash");
const createError = require("http-errors");
const { User } = require("../models");

module.exports.createUser = async (req, res, next) => {
  try {
    const { body } = req;
    const values = _.pick(body, [
      "firstName",
      "lastName",
      "email",
      "password",
      "isMale",
      "birthday",
    ]);
    const createdUser = await User.create(values);
    if (!createdUser) {
      next(createError(400, "Try again"));
    }
    const user = createdUser.get();
    user.password = undefined;
    res.status(201).send({ data: user });
  } catch (error) {
    next(error);
  }
};
module.exports.getAllUsers = async (req, res, next) => {
  try {
    const { pagination } = req;
    const users = await User.findAll({
      // attributes: {
      //   exclude: ["password"],
      // },
      ...pagination,
    });
    res.status(200).send({ data: users });
  } catch (error) {
    next(error);
  }
};
module.exports.updateUsers = async (req, res, next) => {
  try {
    const {
      body,
      params: { userId },
    } = req;
    const [row, [updatedUser]] = await User.update(body, {
      where: {
        id: userId,
      },
      returning: true,
    });
    updatedUser.password = undefined;
    res.status(200).send({ data: updatedUser });
  } catch (error) {
    next(error);
  }
};
module.exports.getUser = async (req, res, next) => {
  try {
    const { instanceUser } = req;
    await instanceUser;
    res.status(200).send({ data: instanceUser });
  } catch (error) {
    next(error);
  }
};
module.exports.deleteUserById = async (req, res, next) => {
  try {
    const { instanceUser } = req;

    await instanceUser.destroy();
    res.status(201).send({ data: instanceUser });
  } catch (error) {
    next(error);
  }
};
