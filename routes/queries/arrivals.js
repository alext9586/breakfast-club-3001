const db = require("./dbinit").db;

function getAll(req, res, next) {
  let query = "select arr.id, arr.memberid, (mem.firstname || ' ' || mem.lastname) membername, arr.arrivaltime, arr.notes " +
    "from arrivallog arr left join members mem on arr.memberid = mem.id order by arr.arrivaltime desc";
  db.any(query)
    .then((data) => {
      res.status(200)
        .json(data);
    })
    .catch((err) => {
      return next(err);
    });
}

function insertEntry(req) {
  return db.task("insertEntry", t => {
    return t.none("insert into arrivallog(memberid, arrivaltime, notes)" +
      "values(${memberId}, ${arrivalTime}, ${notes})",
      req.body);
  });
}

function addEntry(req, res, next) {
  insertEntry(req).then(() => {
    res.status(200)
      .json({
        status: 200,
        message: "Inserted member arrival"
      });
    })
    .catch((err) => {
      return next(err);
    });
}

module.exports = {
  getAll: getAll,
  addEntry: addEntry
};