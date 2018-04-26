var express = require('express');
var router = express.Router();

var db = require('./queries');

router.get('/members/all', db.getAllMembers);

router.post('/members/add', db.addMember);

router.post('/members/update', db.updateMember);

router.delete('/members/delete', db.deleteMember);

router.post('/members/rotate', db.rotate);

router.post('/members/saveList', db.saveList);

module.exports = router;