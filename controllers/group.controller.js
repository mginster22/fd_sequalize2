const _ = require("lodash");

const { Group, User } = require("../models");
const createError = require("http-errors");

module.exports.createGroup = async (req, res, next) => {
  try {
    const { body } = req;
    const values = _.pick(body, ["name", "imagePath", "description"]);

    const group = await Group.create(values);

    const user = await User.findByPk(body.userId);

    await user.addGroup(group);

    res.status(201).send({ data: group });
  } catch (error) {
    next(error);
  }
};
module.exports.getUsersFromGroup = async (req, res, next) => {
  try {
    const {
      params: { groupId },
    } = req;
    const group = await Group.findByPk(groupId, {
      include: [
        {
          model: User,
          through: {
            attributes: ["userId"],
          },
          attributes: ["id", "email", "firstName"],
        },
      ],
    });
    if (!group) {
      next(createError(404, "Group not found"));
    }
    res.status(200).send({ data: { group } });
  } catch (error) {
    next(error);
  }
};
// module.exports.addUsersAtGroup = async (req, res, next) => {
//   try {
//     const {
//       params: { groupId },
//       body: { userId },
//     } = req;
//     const group = await Group.findByPk(groupId);
//     if (!group) {
//       next(createError(404, "Group not found"));
//     }
//     const user = await User.findByPk(userId);
//     if (!user) {
//       next(createError(404, "User not found"));
//     }
//     await group.addUser(user);
//     res.status(200).send({ date: group });
//   } catch (error) {
//     next(error);
//   }
// };
module.exports.addUsersAtGroup = async (req, res, next) => {
  try {
    const {
      instanceGroup,
      body: { userId },
    } = req;
    await instanceGroup;
    const user = await User.findByPk(userId);
    await instanceGroup.addUser(user);
    res.status(200).send({ date: instanceGroup });
  } catch (error) {
    next(error);
  }
};
module.exports.getGroupsFromUsers = async (req, res, next) => {
  try {
    const {
      params: { userId },
    } = req;
    const user = await User.findByPk(userId, {
      include: [
        {
          model: Group,
          through: {
            attributes: [],
          },
          attributes: ["id", "name"],
        },
      ],

      attributes: ["id", "firstName", "lastName"],
    });
    if (!user) {
      next(createError(404, "User not found"));
    }
    res.status(200).send({ data: { user } });
  } catch (error) {
    next(error);
  }
};
module.exports.addGroupImage = async (req, res, next) => {
  try {
    const {
      params: { groupId },
      file: { filename },
    } = req;
    const [row, [updateGroup]] = await Group.update(
      { imagePath: filename },
      {
        where: {
          id: groupId,
        },
        returning: true,
      }
    );
    res.status(200).send({ data: updateGroup });
  } catch (error) {
    next(error);
  }
};
module.exports.deleteGroup = async (req, res, next) => {
  try {
    const {
      params: { groupId },
    } = req;
    const deleteGroup = await Group.destroy(groupId);
    res.status(200).send({ data: deleteGroup });
  } catch (error) {
    next(error);
  }
};
