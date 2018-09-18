var express = require('express');
var router = express.Router();
var mysql_dbc = require('../../db/db_con')();
var connection = mysql_dbc.init();
var bcrypt = require('bcrypt');

var fncard = {}

fncard.cardinfo = function (req, res, next) {
  var sql_insert = 'INSERT INTO card_info (id,cardbank,cardnum,YY,MM) VALUES(?,?,?,?,?)';

  var
   new_id = req.body.userid,
   params = [new_id, req.body.cardbank, req.body.cardnum ,req.body.year, req.body.month];

   cardnum_length = 16;

   if(new_id == ""){
     console.log('err : don\'t send your userid'); return res.json({'err' : 'don\'t send your userid'});
   }

    connection.query(sql_insert,params, function (err, result) {
      // console.log(err);
      if(err){
        console.log(err);
        res.json({'err' : 'don\'t send your information'});
      }else{
        console.log('cardinfo_update_success');
        res.json({'function' : 'cardinfo','result' : 'true'});
      }
    });
}

module.exports = fncard;
