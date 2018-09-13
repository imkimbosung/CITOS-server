var express = require('express');
var router = express.Router();
var mkqr = require('../../function/funQrcode/funQrcode');

router.post('/', function (req, res, next) {
  console.log(req);
  mkqr.mkqrcode(req, res, next);
});

// test용
router.get('/', function (req, res, next) {
  console.log("TEST GET");
  res.json({"test" : "Test"})
  // mkqr.mkqrcode(req, res, next);
});


module.exports = router;
