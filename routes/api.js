var express = require('express');
var router = express.Router();

var members = require('./queries/members');
var arrivals = require('./queries/arrivals');

router.get('/members/all', members.getAllMembers);

router.post('/members/add', members.addMember);

router.post('/members/update', members.updateMember);

router.delete('/members/delete', members.deleteMember);

router.post('/members/rotate', members.rotate);

router.post('/members/saveList', members.saveList);

// ----------------------------------------------------------------------------

router.get('/arrivals/all', arrivals.getAll);

router.post('/arrivals/add', arrivals.addEntry);

module.exports = router;