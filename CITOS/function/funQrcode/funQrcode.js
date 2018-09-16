var express = require('express');
var router = express.Router();
var QRCode = require('qrcode');

var fn = {};
fn.mkqrcode =  function (req, res, next) {
  var
    params = new Object();
    params.menu = req.body.menu;
    // params.price = req.body.price;
    // params.userinfo = req.body.userinfo;
    qrinfo = JSON.stringify(params);
    console.log('qrcode 정보 : '+ qrinfo);
QRCode.toDataURL(qrinfo, function(err, url){
  if(err){
    console.log(err);
    res.send(err);
  }else{
    console.log(url);
    // res.send(url);
    res.json({'QRcode' : url});
  }
});
}

module.exports = fn;
