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
});

// sign in
router.post('/signin', function(req, res, next) {
  infor.signin(req, res, next);
});

// router.post('/signin', passport.authenticate('local-signin', {failureRedirect: '/', failureFlash: true}), // 인증 실패 시 401 리턴, {} -> 인증 스트레티지
//   function (req, res) {
//     console.log('signin done!');
//     res.redirect('/allInfo');
//   });
// router.post('/signin', passport.authenticate('local-signin', {
//       successRedirect: '/users/allInfo',
//       failureRedirect: '/',
//       failureFlash: true
//   }));
//
//
// passport.use('local-signin',new LocalStrategy({
//   usernameField: 'userid',
//   passwordField: 'password',
//   passReqToCallback: true //인증을 수행하는 인증 함수로 HTTP request를 그대로  전달할지 여부를 결정한다
//
// }, function (req, username, password, done) {
// console.log('test');
//    // infor.signin(req, res, done);
//   if(username === 'user001' && password === 'password'){
//     return done(null, {
//       'user_id': username,
//     });
//   }else{
//     return done(false, null)
//   }
// }));

// delete
router.delete('/delete', function(req, res, next) {

});

// passport.serializeUser(function (user, done) {
//   done(null, user)
// });
// passport.deserializeUser(function (user, done) {
//   done(null, user);
// });

module.exports = router;
