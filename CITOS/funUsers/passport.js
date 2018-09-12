var session = require('express-session');
var passport = require('passport');
var express = require('express');
var mysql_dbc = require('../db/db_con')();
var connection = mysql_dbc.init();
var bcrypt = require('bcrypt');
var flash = require('connect-flash');
var LocalStrategy = require('passport-local').Strategy;

module.exports = () => {
  passport.serializeUser((user, done) => { // Strategy 성공 시 호출됨
    done(null, user.id); // 여기의 user가 deserializeUser의 첫 번째 매개변수로 이동
    console.log('serializeUser 성공');
  });

  passport.deserializeUser((id, done) => { // 매개변수 id는 req.session.passport.user에 저장된 값
    console.log('deserializeUser 성공');
    connection.query("select * from customer_info where id = ? ", id, function (err, rows){

       done(err, rows[0]);

   });
  });

passport.use('local', new LocalStrategy({

  usernameField: 'username',

  passwordField: 'password',

  session: true,

  passReqToCallback: true //passback entire req to call back
} , function (req, username, password, done){
console.log(username);

      if(!username || !password ) { return done(null, false, req.flash('message','All fields are required.')); }

      connection.query("select * from customer_info where id = ?", [username], function(err, rows){

          console.log(err); console.log(rows);

        if (err) return done(req.flash('message',err));

        if(!rows.length){ return done(null, false, req.flash('message','Invalid username or password.')); }

        if(!bcrypt.compareSync(password, rows[0].pw)){

            return done(null, false, req.flash('message','Invalid username or password.'));

         }

        return done(null, rows[0]);

      });

    }

));
}
