const { Sequelize } = require("sequelize");

require("dotenv").config();

const user = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_NAME;
const host = process.env.DB_HOST;

const db = new Sequelize(database, user, password, {
  host: host,
  dialect: "mysql",
  define: {
    timestamps: true,
    underscored: true,
  },
});

module.exports = db;
