var session = require('express-session');
var passport = require('passport');
var express = require('express');
var router = express.Router();
var mysql_dbc = require('../../db/db_con')();
var connection = mysql_dbc.init();
var bcrypt = require('bcrypt');
var flash = require('connect-flash');
var LocalStrategy = require('passport-local').Strategy;

module.exports = () => {
  /* 사용자 정보 세션 저장 */
  passport.serializeUser((user, done) => { // Strategy 성공 시 호출됨
    done(null, user.id); // 여기의 user가 deserializeUser의 첫 번째 매개변수로 이동
  });

  passport.deserializeUser((id, done) => { // 매개변수 id는 req.session.passport.user에 저장된 값
    connection.query("select * from customer_info where id = ? ", id, function (err, rows){

       done(err, rows[0]);

   });
  });

passport.use('local', new LocalStrategy({

  useridField: 'userid',

  passwordField: 'password',

  session: true,

  passReqToCallback: true //passback entire req to call back

} , function (req, userid, password, done){

      if(!userid || !password ) { return done(null, false, req.flash('message','All fields are required.')); }

      connection.query("select * from customer_info where id = ?", [userid], function(err, rows){

      //  console.log(rows);

        if (err) return done(req.flash('message',err));

        if(!rows.length){
          console.log('*******  Invalid userid.');
          return done(null, false, req.flash('message','Invalid userid.'));
        }

        if(!bcrypt.compareSync(password, rows[0].pw)){
            console.log('*******  Invalid password.');
            return done(null, false, req.flash('message','Invalid password.'));
          }

        return done(null, rows[0]);

      });

    }

));
}
