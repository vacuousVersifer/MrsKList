const Sequelize = require("sequelize");

const sequelize = new Sequelize({
  host: "localhost",
  dialect: "sqlite",
  logging: false,
  storage: "./.data/database.sqlite"
});

const Entries = require("./tables/Entries")(sequelize, Sequelize.DataTypes);
const Users = require("./tables/Users")(sequelize, Sequelize.DataTypes);
const Suggestions = require("./tables/Suggestions")(sequelize, Sequelize.DataTypes);
const Tokens = require("./tables/Tokens")(sequelize, Sequelize.DataTypes);

module.exports = { Entries, Users, Suggestions, Tokens };
