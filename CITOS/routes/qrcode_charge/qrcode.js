var express = require('express');
var router = express.Router();
var mkqr = require('../../function/funQrcode/funQrcode');

router.post('/', function (req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  mkqr.mkqrcode(req, res, next);
});

// app received qrcode infomation
router.post('/qrbill', function(req, res, next) {
  mkqr.qrbill(req, res, next);
});

module.exports = router;
