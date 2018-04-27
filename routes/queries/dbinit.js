const promise = require("bluebird");

const options = {
    // Initialization Options
    promiseLib: promise
  };
  
const cn = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: "breakfastclub",
    user: process.env.DB_USER,
    password: process.env.DB_PASS
};
  
const pgp = require("pg-promise")(options);
const db = pgp(cn);

  module.exports = {
      pgp, db
  };