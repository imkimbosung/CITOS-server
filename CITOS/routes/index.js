var express = require('express');
var app = express();
var router = express.Router();
var request = require('request'); // 서버에서 내보낼 때
var mysql_dbc = require('../db/db_con')();
var connection = mysql_dbc.init();



/* controllers */
router.get('/', function(req, res, next) {
  res.send('connected server')
});



// /* DATA BASE UPDATE */
// var sql_update = 'UPDATE customer_info SET name=? WHERE age=?';
// router.put('/data/update/:name', function(req, res,next){
//   var params = [req.params.name, 201801];
//   connection.query(sql_update, params, function(err, rows, fields){
//     if (err) console.log(err);
//     // console.log(rows);
//     console.log("Record Updated!!  " + req.params.name);
//   });
// });

module.exports = router;
