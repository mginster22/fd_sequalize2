const { Router } = require("express");
const taskRouter = Router();
const TaskController = require("../controllers/task.controller");

const { checkTask } = require("../middlewares/task.mw");

taskRouter.patch("/tasks/:taskId", checkTask, TaskController.updateTask);
taskRouter.patch(
  "/users/:usersId/tasks/:taskId",
  checkTask,
  TaskController.updateTaskByUser
);

module.exports = taskRouter;
