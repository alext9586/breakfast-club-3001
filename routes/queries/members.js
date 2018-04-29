const db = require("./dbinit").db;

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

function insertIntoRotation(t, userId) {
  let rotationOrderQuery = "select coalesce(max(rotationorder), 0)+1 from memberrotation";
  return t.none("insert into memberrotation(memberid, rotationorder) values($1, $2)", [userId, 0]).then(q => {
    return t.none("update memberrotation set rotationorder=(" + rotationOrderQuery + ") where memberid=$1", [userId]);
  });
}

function insertMember(req) {
  return db.task("insertMember", t => {
    return t.one("insert into members(firstname, lastname, slackusername, isactive)" +
    "values(${firstName}, ${lastName}, ${slackUsername}, ${isActive}) returning id",
    req.body).then(user => {
      return insertIntoRotation(t, user.id);
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

function normalizeMemberRotation() {
  db.any("select m.id, mr.rotationorder from members m left join memberrotation mr on m.id = mr.memberid order by rotationorder")
    .then(membersList => {
      membersList.forEach((member, index) => {
        db.none("update memberrotation set rotationorder=$1 where memberid=$2", [index + 1, member.id]);
      });
    });
}

function deleteFromMembersAndRotation(memberId) {
  return db.task("deleteMember", t => {
    return t.none("DELETE FROM members WHERE id=$1", [memberId]).then(() => {
      return t.none("DELETE FROM memberrotation WHERE memberid=$1", [memberId]).then(() => {
        normalizeMemberRotation();
      })
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

function changeActive(req, res, next) {
  let memberId = req.body.id;
  let isActive = req.body.isActive;

  db.task(t => {
    return t.none("update members set isactive = $1 where id = $2", [isActive, memberId]).then(() => {
      if(req.body.isActive){
        return insertIntoRotation(t, memberId);
      } else {
        return t.none("DELETE FROM memberrotation WHERE memberid=$1", [memberId]).then(() => {
          normalizeMemberRotation();
        });
      }
    });
  }).then(() => {
    res.status(200)
      .json({
        status: 200,
        message: "Changed member status"
      });
  });
}

module.exports = {
  getAllMembers: getAllMembers,
  addMember: addMember,
  updateMember: updateMember,
  deleteMember: deleteMember,
  rotate: rotate,
  saveList: saveList,
  changeActive: changeActive
};