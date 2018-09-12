var express = require('express');
var router = express.Router();
var request = require('request'); // 서버에서 내보낼 때

/* controllers */
router.get('/', function(req, res, next) {
  res.send('connected server')
});

module.exports = router;
