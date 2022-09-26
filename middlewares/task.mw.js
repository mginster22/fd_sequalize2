const { Task } = require("../models");
const createError = require("http-errors");

module.exports.checkTask = async (req, res, next) => {
  try {
    const {
      params: { taskId },
    } = req;
    const task = await Task.findByPk(taskId);
    if (!task) {
      next(createError(404, "Task  not a fount"));
    }
    req.instanceTask = task;
    next();
  } catch (error) {
    next(error);
  }
};
