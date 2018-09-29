var express = require('express');
var router = express.Router();
var request = require('request'); // 서버에서 내보낼 때
var chat = require('../function/funChat/funChat');

/* controllers */
router.get('/', function(req, res, next) {
  res.send('connected server')
});

router.post('/chatBot', function(req, res) {
  chat.oneChat(req, res);  
});


module.exports = router;
