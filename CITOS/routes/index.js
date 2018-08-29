var express = require('express');
var app = express();
var router = express.Router();
var request = require('request'); // 서버에서 내보낼 때
var mysql = require('mysql'); //sql 선언

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'devel',
  password : 'devel',
  database : 'citos',
  multipleStatements : true
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* DATA BASE SELECT */
var sql_select = 'SELECT * FROM customer_info WHERE _id=?';
router.get('/data/select/:_id', function(req, res, next) {
  var params = [req.params._id];
  connection.query(sql_select,params, function(err, rows) {
    if(!err){
      console.log(rows);
      res.send(200, rows);
    } else {
      console.log('Error');
      res.render('index', {title:'Error'});
    }
  });
});

/* DATA BASE UPDATE */
var sql_update = 'UPDATE customer_info SET name=? WHERE age=?';
router.get('/data/update/:name', function(req, res,next){
  var params = [req.params.name, 201801];
  connection.query(sql_update, params, function(err, rows, fields){
    if (err) console.log(err);
    // console.log(rows);
    console.log("Record Updated!!  " + req.params.name);
  });
});

module.exports = router;
