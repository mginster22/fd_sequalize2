const { Router } = require("express");
const UserController = require("../controllers/user.controller");
const TaskController = require("../controllers/task.controller");
const GroupController = require("../controllers/group.controller");
const { checkUser } = require("../middlewares/user.mw");
const { paginate } = require("../middlewares/paginate.mv");

const userRouter = Router();
userRouter.post("/", UserController.createUser);
userRouter.get("/", paginate, UserController.getAllUsers);

userRouter.patch("/:userId", UserController.updateUsers);
userRouter.get("/:userId", checkUser, UserController.getUser);
userRouter.delete("/:userId", checkUser, UserController.deleteUserById);

userRouter.post("/:userId/tasks", checkUser, TaskController.createTask);
userRouter.get("/:userId/tasks", checkUser, TaskController.getTasksByUser);
userRouter.get("/tasks", paginate, TaskController.getAllTasks);
userRouter.get("/:userId/tasks", paginate, TaskController.getAllTasks);

userRouter.get("/:userId/groups", GroupController.getGroupsFromUsers);

module.exports = userRouter;
