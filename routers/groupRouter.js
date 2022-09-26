const { Router } = require("express");
const { checkGroup } = require("../middlewares/group.mw");
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, "../public/images"));
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });
const GroupController = require("../controllers/group.controller");

const groupRouter = Router();

groupRouter.post("/", GroupController.createGroup);
groupRouter.get("/:groupId", GroupController.getUsersFromGroup);
groupRouter.patch("/:groupId", checkGroup, GroupController.addUsersAtGroup);

groupRouter.post(
  "/:groupId/image",
  upload.single("image"),
  GroupController.addGroupImage
);

groupRouter.delete("/:groupId",GroupController.deleteGroup)

module.exports = groupRouter;
