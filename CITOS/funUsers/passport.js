var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var express = require('express');
var router = express.Router();
var mysql_dbc = require('../db/db_con')();
var connection = mysql_dbc.init();

var fnppt = {};
// fnppt.pport = function (passport) {
//   // used to serialize the user for the session
//   passport.serializeUser(function(user, done) {
// 		done(null, user.id);
//     });
//
//     // used to deserialize the user
//     passport.deserializeUser(function(id, done) {
// 		connection.query("SELECT * FROM customer_info WHERE id = "+id,function(err,rows){
// 			done(err, rows[0]);
// 		});
//     });
//
// }

module.exports = fnppt;
