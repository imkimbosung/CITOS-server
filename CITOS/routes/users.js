var express = require('express');
var router = express.Router();
var infor = require('../funUsers/funUsers');
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

router.post('/signin', passport.authenticate('local', {
  successRedirect: '/allInfo',

  failureRedirect: '/',

  failureFlash: true
}),function(req, res, info){
  res.render('/users/signup',{'message' :req.flash('message')});

});

// delete
router.delete('/delete', function(req, res, next) {
  res.json({});
});


module.exports = router;
