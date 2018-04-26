var promise = require("bluebird");

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

var pgp = require("pg-promise")(options);
var db = pgp(cn);

function getAllMembers(req, res, next) {
  db.any("select m.id, m.firstname, m.lastname, m.slackusername, mr.rotationorder, m.isactive " +
    "from members m left join memberrotation mr on m.id = mr.memberid order by rotationorder")
    .then(function (data) {
      res.status(200)
        .json(data);
    })
    .catch(function (err) {
      return next(err);
    });
}

function insertMember(req) {
  return db.task("insertMember", t => {
    return t.one("insert into members(firstname, lastname, slackusername, isactive)" +
    "values(${firstName}, ${lastName}, ${slackUsername}, ${isActive}) returning id",
    req.body).then(user => {
      let rotationOrderQuery = "select coalesce(max(rotationorder), 0)+1 from memberrotation";
      return t.none("insert into memberrotation(memberid, rotationorder) values($1, $2)", [user.id, 0]).then(q => {
        return t.none("update memberrotation set rotationorder=(" + rotationOrderQuery + ") where memberid=$1", [user.id]);
      });
    });
  });
}

function addMember(req, res, next) {
  insertMember(req)
    .then(function () {
      res.status(200)
        .json({
          status: 200,
          message: "Inserted one member"
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function updateMember(req, res, next) {
  var query = "UPDATE members SET " +
    "firstname = $1," +
    "lastname = $2," +
    "slackusername = $3," +
    "isactive = $4 " +
    "WHERE id = $5";

  var queryParams = [
    req.body.firstName,
    req.body.lastName,
    req.body.slackUsername,
    req.body.isActive,
    req.body.id
  ];

  db.result(query, queryParams)
    .then(result => {
      res.status(200)
        .json({
          status: 200,
          message: "Updated one member"
        });
      })
      .catch(error => {
          console.log("ERROR:", error);
      });
}

function deleteFromMembersAndRotation(memberId) {
  return db.task("deleteMember", t => {
    return t.none("DELETE FROM members WHERE id=$1", [memberId]).then(() => {
      return t.none("DELETE FROM memberrotation WHERE memberid=$1", [memberId]);
    });
  });
}

function deleteMember(req, res, next) {
  deleteFromMembersAndRotation(req.body.memberId)
    .then(() => {
        res.status(200)
          .json({
            status: 200,
            message: "Deleted one member"
          });
    })
    .catch(error => {
        console.log("ERROR:", error);
    });
}

function rotateMembers() {
  return db.task("rotateMembers", t => {
    return t.one("select coalesce(max(rotationorder), 0)+1 maxrotvalue from memberrotation").then(maxOrder => {
      return t.none("update memberrotation set rotationorder=$1 where rotationorder=1", [maxOrder.maxrotvalue]).then(() => {
        let innerSelect = "select * from memberrotation";
        let query = `update memberrotation set rotationorder=x.rotationorder-1 from (${innerSelect}) x where x.id = memberrotation.id`;
        return t.none(query);
      });
    });
  });
}

function rotate(req, res, next) {
  rotateMembers()
    .then(() => {
      res.status(200)
        .json({
          status: 200,
          message: "Rotated members"
        });
    })
    .catch(error => {
      console.log("ERROR:", error);
    });
}

function saveNewOrder(membersList) {
  return db.task("saveNewOrder", t => {
    return t.none("delete from memberrotation").then(() => {
      membersList.forEach(member => {
        t.none("insert into memberrotation(memberid, rotationorder) values($1, $2)", [member.id, member.rotationOrder]);
      });
    });
  });
}

function saveList(req, res, next) {
  saveNewOrder(req.body.membersList).then(() => {
    res.status(200)
      .json({
        status: 200,
        message: "Saved new order"
      });
  });
}

module.exports = {
  getAllMembers: getAllMembers,
  addMember: addMember,
  updateMember: updateMember,
  deleteMember: deleteMember,
  rotate: rotate,
  saveList: saveList
};