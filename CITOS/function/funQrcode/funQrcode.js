var express = require('express');
var router = express.Router();
var QRCode = require('qrcode');
var mysql_dbc = require('../../db/db_con')();
var connection = mysql_dbc.init();

var fn = {};
// qrcode make
fn.mkqrcode =  function (req, res, next) {
  var
    params = new Object();
    allprice = 0;
    allprice = parseInt(allprice);

// price 총 합계
    for(var i = 0; i < req.body.price.length; i++ ){
      price = parseInt(req.body.price[i]);
      allprice += price;
    }
    params.menu = req.body.menu;
    params.price = allprice;
    qrinfo = JSON.stringify(params);
    console.log('qrcode 정보 : '+ qrinfo);
QRCode.toDataURL(qrinfo, function(err, url){

  if(err){
    console.log(err);
    res.json({success: false, msg: err});
  }else if(req.body.menu == "" || req.body.price == ""){
    console.log('Menu or price information is empty.');
    res.json({success: false, msg : 'Menu or price information is empty.'});
  }else{
    // console.log(url);
    res.json({'QRcode' : url});
  }
});
}

// Save billing information
fn.qrbill = function (req, res, next) {
  var sql_insert = 'INSERT INTO buy_info (id,menu,price,buytime,cardnum) VALUES(?,?,?,?,?)'
  var sql_check = 'SELECT * FROM card_info WHERE id = ? '

// buytime은 null주면 db에서 자동 시간 저장됨.
  var
   new_id = req.body.userid;
   console.log(req.body.menu);
   if (!Array.isArray(req.body.menu)){new_menu = req.body.menu;}
   // if (req.body.menu.length == 0){new_menu = req.body.menu;}
   else{ new_menu = req.body.menu.join(', '); }
  
// confirm ID
   connection.query(sql_check, new_id, function (err, result) {
     if (err) {
         console.log('err :' + err);
         return res.json({success: false, msg: err});
       }else {
         if (result.length === 0) {
           console.log('아이디 오류!' );
           return res.json({success: false, msg: 'This user does not exist.'});
         }
       }
       console.log('id check - pass');

// uploading

    var params = [new_id, new_menu, req.body.price ,null,result[0].cardnum];
       connection.query(sql_insert,params, function (err, result) {
         if(err){
           console.log(err);
           res.json({success: false, msg : err});
         }
         else{
           console.log('qrbill_info_update_success');
           res.json({success : true, msg : 'qrbill info update success'});
         }
       });
   });
}

module.exports = fn;
