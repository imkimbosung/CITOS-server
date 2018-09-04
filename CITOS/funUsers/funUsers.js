var express = require('express');
var router = express.Router();
var mysql_dbc = require('../db/db_con')();
var connection = mysql_dbc.init();
var bcrypt = require('bcrypt');

var fn = {};
fn.userinfo =  function (req, res, next) {
  var sql = 'SELECT * FROM customer_info' ;

  connection.query(sql,function(err, result) {
    if(!err){
      res.send(result);
    } else {
      console.log('Error');
      res.render('index', {title:'Error'});
    }
  });
}

fn.signup = function (req, res, next) {
  var sql_insert = 'INSERT INTO customer_info (id, pw, name, age, sex) VALUES(?,?,?,?,?)';
  const saltRounds = 5;

  var
   new_id = req.body.newid,
   new_pw_hash = bcrypt.hashSync(req.body.newpw, saltRounds),
   params = [new_id, new_pw_hash , req.body.newname ,req.body.newage, req.body.newsex];

    connection.query(sql_insert,params, function (err, result) {
      console.log(new_pw_hash);
      if(err.errno === 1062){
        res.send('ID 중복입니다.');
      }
      else if(err){
        console.log(err)
      }
      else{
            res.send('회원가입 완료!');
      }
    });
}

fn.signin = function (req, res, next) {
  var sql_select = 'SELECT * FROM customer_info WHERE id=?';

  var
    user_id = req.body.userid,
    password = req.body.password;

  connection.query(sql_select, user_id, function(err, result) {
    if (err) {
      console.log('err :' + err);
    }else {
      if (result.length === 0) {
        res.json({success: false, msg: '해당 유저가 존재하지 않습니다.'})
      } else {
        if(!bcrypt.compareSync(password, result[0].pw)) {
          res.json({success: false, msg: '비밀번호가 일치하지 않습니다.'})
        } else {
          res.json({success: true})
        }
      }
    }
  });
}
module.exports = fn;
