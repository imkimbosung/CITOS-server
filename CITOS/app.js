var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var flash = require('connect-flash');
var session = require('express-session'); //세션연결
var passport = require('passport');
var passportConfig = require('./function/funUsers/passport');
var bodyParser = require("body-parser");


/* router */
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var cardRouter = require('./routes/card');
var adminRouter = require('./routes/admin');
var qrcodeRouter = require('./routes/qrcode_charge/qrcode');

var router = express.Router();
var mysql_dbc = require('./db/db_con')();
var connection = mysql_dbc.init();
var bcrypt = require('bcrypt');


var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

/* session middleware */
app.use(session({ cookie: { maxAge: 60000 },
                  secret: 'keyboard cat',
                  resave: false,
                  saveUninitialized: true}));

app.use(flash());
app.use(passport.initialize()); // passport 구동
app.use(passport.session()); // 세션 연결
passportConfig();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static(path.join(__dirname, 'node_modules')));

// Parse application/json inputs.
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.set("json spaces", 4);

// device server 접속 허용
app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

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


app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
