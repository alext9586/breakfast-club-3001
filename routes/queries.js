var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var cn = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: "breakfastclub",
  user: process.env.DB_USER,
  password: process.env.DB_PASS
};

var pgp = require('pg-promise')(options);
var db = pgp(cn);

function getAllUsers(req, res, next) {
  db.any('select * from users')
    .then(function (data) {
      res.status(200)
        .json(data);
    })
    .catch(function (err) {
      return next(err);
    });
}


function addUser(req, res, next) {
  db.none('insert into users(firstname, lastname, slackusername, isactive)' +
      'values(${firstName}, ${lastName}, ${slackUsername}, ${isActive})',
    req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one user'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

module.exports = {
  getAllUsers: getAllUsers,
  addUser: addUser
};