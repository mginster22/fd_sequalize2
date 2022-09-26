const { Router } = require("express");
const userRouter = require("./userRouter");
const groupRouter = require("./groupRouter");
const taskRouter = require("./taskRouter");
const router = Router();

router.use("/users", userRouter);
router.use("/groups", groupRouter);
router.use("/tasks", taskRouter);

module.exports = router;
