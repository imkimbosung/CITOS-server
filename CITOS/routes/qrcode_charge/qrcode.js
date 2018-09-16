var express = require('express');
var router = express.Router();
var mkqr = require('../../function/funQrcode/funQrcode');

router.post('/', function (req, res, next) {
  mkqr.mkqrcode(req, res, next);
});

module.exports = router;
