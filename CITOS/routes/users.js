var express = require('express');
var router = express.Router();
var infor = require('../function/funUsers/funUsers');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var cookieSession = require('cookie-session');
var flash = require('connect-flash');


/* user infor */
router.get('/allInfo', function(req, res, next) {
  infor.userinfo(req, res, next);
});

// sign up
router.post('/signup', function(req,res,next){
  infor.signup(req,res,next);
  res.send('signup pages');
});

router.post('/signin', passport.authenticate('local',{failureRedirect: '/users/signin', failureFlash: true}
),function(req, res){
  // res.redirect('/users/allInfo');
  // res.json({'signinresult':true});
  console.log('ID : '+ req.body.username);
  console.log('******* signin *******');
  res.send('true');
});
// 로그인 false 시 값 보내주는곳
router.get('/signin', function (req,res) {
  res.send('false');
});


// delete
router.delete('/delete', function(req, res, next) {
  res.json({});
});




module.exports = router;
