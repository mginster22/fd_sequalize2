const { Op } = require("sequelize");
const { Task } = require("../models");

module.exports.createTask = async (req, res, next) => {
  try {
    const { body, instanceUser } = req;
    const task = await instanceUser.createTask(body);
    res.status(201).send({ data: task });
  } catch (error) {
    next(error);
  }
};
module.exports.getTasksByUser = async (req, res, next) => {
  try {
    const { instanceUser } = req;
    const gotTasksByUser = await instanceUser.getTasks();
    res.status(200).send({ data: gotTasksByUser });
  } catch (error) {
    next(error);
  }
};
module.exports.updateTask = async (req, res, next) => {
  try {
    const { body, instanceTask } = req;
    const updateTask = await instanceTask.update(body, { returning: true });
    res.status(200).send({ data: updateTask });
  } catch (error) {
    next(error);
  }
};
module.exports.updateTask = async (req, res, next) => {
  try {
    const { body, instanceTask } = req;
    const updateTask = await instanceTask.update(body, { returning: true });
    res.status(200).send({ data: updateTask });
  } catch (error) {
    next(error);
  }
};

module.exports.updateTaskByUser = async (req, res, next) => {
  try {
    const {
      body,
      instanceTask,
      params: { userId, taskId },
    } = req;
    const getTaskByUserId = await Task.findAll({
      where: {
        [Op.and]: [{ id: taskId }, { userId: userId }],
      },
    });
    const updateTask = await getTaskByUserId[0].update(body, {
      returning: true,
    });
    res.status(200).send({ data: updateTask });
  } catch (error) {
    next(error);
  }
};
module.exports.getAllTasks = async (req, res, next) => {
  try {
    const { pagination } = req;
    const tasks = await Task.findAll({
      ...pagination,
    });
    res.status(200).send({ data: tasks });
  } catch (error) {
    next(error);
  }
};
