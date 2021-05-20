const Sequelize = require("sequelize");

const sequelize = new Sequelize({
  host: "localhost",
  dialect: "sqlite",
  logging: false,
  storage: "./.data/database.sqlite"
});

require("./tables/Entries")(sequelize, Sequelize.DataTypes);
require("./tables/Users")(sequelize, Sequelize.DataTypes);
require("./tables/Suggestions")(sequelize, Sequelize.DataTypes);
require("./tables/Tokens")(sequelize, Sequelize.DataTypes);

const force = process.argv.includes("--force") || process.argv.includes("-f");

sequelize.sync({ force }).then(async () => {
  console.log("Database synced");
  sequelize.close();
}).catch(console.error);