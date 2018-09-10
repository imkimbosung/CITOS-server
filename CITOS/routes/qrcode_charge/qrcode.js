var express = require('express');
var router = express.Router();
var mkqr = require('../../funQrcode/funQrcode');
// var Image = require('canvas');


router.post('/', function (req, res, next) {
  mkqr.mkqrcode(req, res, next);
});


module.exports = router;
