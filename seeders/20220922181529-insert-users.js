const _ = require("lodash");

const generateUser = (key) => ({
  first_name: `Name${key}`,
  last_name: `Name${key}`,
  email: `Name${key}@gmail.com`,
  password_hash: `pass${key}`,
  birthday: new Date(1980, 0, key),
  is_male: _.random(1, 10) > 5,
  created_at: new Date(),
  updated_at: new Date(),
});
const genereateUsers = (amount = 50) => {
  return new Array(amount > 500 ? 500 : amount)
    .fill(null)
    .map((e, i) => generateUser(i));
};
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("users", genereateUsers(100), {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
