var express = require('express');
var router = express.Router();
var mysql_dbc = require('../db/db_con')();
var connection = mysql_dbc.init();

/* /admin first page */
router.get('/', function(req, res, next) {
  res.send('first page');
});

// 고객 정보 보여주기
router.get('/ctinfor', function(req,res,next){
res.send('test');
});

// 메뉴 조회
router.get('/menu', function(req,res,next){
res.send('test');
});

// 메뉴 추가
router.post('/menu/add', function(req,res,next){
res.send('test');
});

// 메뉴 삭제
router.delete('/menu/delete', function(req, res, next){
res.send('test');
});

// 나이, 연령별 선호 메뉴 조회
router.get('/menu/salesrd', function(req, res, next){
res.send('test');
});

module.exports = router;
