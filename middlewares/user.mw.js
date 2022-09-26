const { User } = require("../models");
const createError = require("http-errors");

module.exports.checkUser = async (req, res, next) => {
  try {
    const {
      params: { userId },
    } = req;
    const instanceUser = await User.findByPk(userId);
    if (!instanceUser) {
      next(createError(404, "User not fount"));
    }
    req.instanceUser = instanceUser;
    next();
  } catch (error) {
    next(error);
  }
};
