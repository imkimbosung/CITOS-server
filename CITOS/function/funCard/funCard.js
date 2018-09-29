var express = require('express');
var router = express.Router();
var mysql_dbc = require('../../db/db_con')();
var connection = mysql_dbc.init();
var bcrypt = require('bcrypt');

var fncard = {}

// 카드정보 등록
fncard.cardinfo = function (req, res, next) {
  var sql_insert = 'INSERT INTO card_info (id,cardpw,cardnum,MMYY,CVV) VALUES(?,?,?,?,?)';
  var sql_check = 'SELECT * FROM `customer_info` WHERE `id`= ? ';

  var
   new_id = req.body.userid,
   params = [new_id, req.body.cardpw, req.body.cardnum ,req.body.mmyy, req.body.cvv];

   connection.query(sql_check, new_id, function (err, result) {
     if (err) {
         console.log('err :' + err);
         return res.json({success: false, msg: 'login을 해주세요!'});
       }else {
         if (result.length === 0) {
           console.log('아이디 오류!' );
           return res.json({success: false, msg: 'This user does not exist.'});
         }
       }
       console.log('id check - pass');

       connection.query(sql_insert,params, function (err, result) {
         // console.log(err);
         if(err){
           console.log('err : ' + err);
           res.json({success: false, msg : 'don\'t send your information'});
         }else{
           console.log('cardinfo_update_success');
           res.json({success: true, msg : 'cardinfo update success'});
         }
       });
   });

}

// 카드정보 전송.
// fncard.cardsend = function (req, res, next) {
//   var sql_select = 'SELECT * FROM card_info WHERE id = ? ';
//
//   var check_id = req.body.userid;
//
//   connection.query(sql_select, check_id,function (err, result) {
//     if(err){
//       console.log('err : ' + err);
//       res.json({success: false, msg : 'don\'t send your information'});
//     }else if(result.length === 0){
//       res.json({success:false, msg : 'This user does not exist.'});
//     }
//     else{
//       console.log('cardsend_transport_success');
//       res.json({success: true, info : result[0].cardnum});
//     }
//
//   });
//
// }

module.exports = fncard;
