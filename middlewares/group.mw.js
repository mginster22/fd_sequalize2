const { Group } = require("../models");
const createError = require("http-errors");

module.exports.checkGroup = async (req, res, next) => {
  try {
    const {
      params: { groupId },
    } = req;
    const group = await Group.findByPk(groupId);
    if (!group) {
      next(createError(404, "Group  not a fount"));
    }
    req.instanceGroup = group;
    next();
  } catch (error) {
    next(error);
  }
};
