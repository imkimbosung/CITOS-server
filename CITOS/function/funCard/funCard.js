var express = require('express');
var router = express.Router();
var mysql_dbc = require('../../db/db_con')();
var connection = mysql_dbc.init();
var bcrypt = require('bcrypt');

var fncard = {}

fncard.cardinfo = function (req, res, next) {
  var sql_insert = 'INSERT INTO card_info (id,cardbank,cardnum,YY,MM) VALUES(?,?,?,?,?)';
  var sql_check = 'SELECT * FROM `customer_info` WHERE `id`= ? '

  var
   new_id = req.body.userid,
   params = [new_id, req.body.cardbank, req.body.cardnum ,req.body.year, req.body.month];

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

module.exports = fncard;
