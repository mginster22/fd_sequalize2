"use strict";
const _ = require("lodash");
// const  sequelize  = require("sequelize");
const { User } = require("../models");
module.exports = {
  async up(queryInterface, Sequelize) {
    // const users = await sequelize.query('SELECT * FROM "users"', {
    //   type: sequelize.QueryTypes.SELECT,
    // });
    const users = await User.findAll({
      attributes: ["id", "email"],
    });
    const tasks = users
      .map((u) => {
        return new Array(_.random(2, 7, false)).fill(null).map((t, i) => ({
          user_id: u.id,
          content: `content number ${i + 1} by ${u.email}`,
          dead_line: new Date("2023-10-10 10:10:10"),
          is_done: false,
          created_at: new Date(),
          updated_at: new Date(),
        }));
      })
      .flat(2);
    await queryInterface.bulkInsert("tasks", tasks);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("tasks", null, {});
  },
};
