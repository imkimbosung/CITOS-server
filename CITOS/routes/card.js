var express = require('express');
var router = express.Router();
var infor = require('../function/funCard/funCard');


// /card
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// 카드 정보 조회
router.get('/:id', function(req,res,next){
  res.json({});
});

// 카드 정보 등록
router.post('/add', function(req,res,next){
  infor.cardinfo(req,res,next);
});

// 카드 정보 삭제
router.delete('/remove', function(req,res,next){
  res.json({});
});

// 카드 정보 수정
router.put('/edit', function(req, res, next){
  res.json({});
});


module.exports = router;
