const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  "postgres://docker:docker@127.0.0.1:5432/postgres"
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

module.exports = sequelize;
