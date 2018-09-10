var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
var cookieSession = require('cookie-session');
var flash = require('connect-flash');


/* router */
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var cardRouter = require('./routes/card');
var adminRouter = require('./routes/admin');
var qrcodeRouter = require('./routes/qrcode_charge/qrcode');


var app = express();

var router = express.Router();
var mysql_dbc = require('./db/db_con')();
var connection = mysql_dbc.init();
var bcrypt = require('bcrypt');

app.use(flash());
/* middleware */
app.use(cookieSession({
  keys: ['node_yun'],
  cookie: {
    maxAge: 1000 * 60 * 60 // 유효기간 1시간
  }
}));

app.use(passport.initialize());
app.use(passport.session());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));

/* router  default url*/
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/card', cardRouter);
app.use('/admin', adminRouter);
app.use('/qrcode', qrcodeRouter);

/* catch 404 and forward to error handler */
app.use(function(req, res, next) {
  next(createError(404));
});

/* error handler */
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
