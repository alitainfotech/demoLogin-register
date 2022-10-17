const db = require("./config/database");
const { TRUE, FALSE } = require("./constants/global.constants");

try {
  db.authenticate()
    .then(() => {
      db.sync({ alter: process.env.ALTER ? TRUE : FALSE });
    })
    .catch((err) => console.log("errorrrrrrrrrr", err));
  console.log("Database connected...");
} catch (error) {
  console.error("Connection error:", error);
}
