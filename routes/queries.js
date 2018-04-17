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

function getAllMembers(req, res, next) {
  db.any('select * from members')
    .then(function (data) {
      res.status(200)
        .json(data);
    })
    .catch(function (err) {
      return next(err);
    });
}


function addMember(req, res, next) {
  db.none('insert into members(firstname, lastname, slackusername, isactive)' +
      'values(${firstName}, ${lastName}, ${slackUsername}, ${isActive})',
    req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 200,
          message: 'Inserted one member'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function deleteMember(req, res, next) {
  db.result('DELETE FROM members WHERE id = ${memberId}', req.body)
    .then(result => {
        // rowCount = number of rows affected by the query
        console.log(result.rowCount); // print how many records were deleted;
        res.status(200)
          .json({
            status: 200,
            message: 'Deleted one member'
          });
    })
    .catch(error => {
        console.log('ERROR:', error);
    });
}

module.exports = {
  getAllMembers: getAllMembers,
  addMember: addMember,
  deleteMember: deleteMember
};