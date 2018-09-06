var express = require('express');
var router = express.Router();
var QRCode = require('qrcode');
var Image = require('canvas');



router.post('/', function (req, res) {
    var
      price = req.body.price,
      userinfo = req.body.userinfo,
      params = [price, userinfo];
  QRCode.toDataURL(params, function(err, url){
    if(err){
      console.log(err);
      res.send(err);
    }else{      
      console.log(url);
      res.send(url);
    }
  });
})


module.exports = router;
