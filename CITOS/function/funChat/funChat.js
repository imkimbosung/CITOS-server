var express = require('express');
var router = express.Router();
var RiveScript = require("rivescript");
// Create the bot.
var bot = new RiveScript({utf8: true});

bot.unicodePunctuation = new RegExp(/[.,!?;:]/g);

bot.loadDirectory("./brain").then(success_handler).catch(error_handler);

function success_handler() {
  bot.sortReplies();
}

var chat = {};

function isJSON(data) {
	var ret = true;
	try {
	   JSON.parse(data);
	}catch(e) {
	   ret = false;
	}
	return ret;
 }

chat.oneChat =  function (req, res) {
  	// Get data from the JSON post.

  	var username = req.body.username;
  	var message  = req.body.message;
  	var vars     = req.body.vars;
    console.log(username);
  	// Make sure username and message are included.
  	if (typeof(username) === "undefined" || typeof(message) === "undefined") {
  		return error(res, "username and message are required keys");
  	}

  	// Copy any user vars from the post into RiveScript.
  	if (typeof(vars) !== "undefined") {
  		for (var key in vars) {
  			if (vars.hasOwnProperty(key)) {
  				bot.setUservar(username, key, vars[key]);
  			}
  		}
  	}

  	// Get a reply from the bot.
  	bot.reply(username, message, this).then(function(reply) {
  		// Get all the user's vars back out of the bot to include in the response.
console.log("TEST111");
      var answer = {}
  		answer.status = "ok";
  		answer.vars = vars;

  		vars = bot.getUservars(username);
  		console.log(isJSON(reply));
  		if(isJSON(reply)){
        console.log("TEST");
  			var body = JSON.parse(reply);
  			console.log(JSON.stringify(body));

  			answer.type = body.type;
  			answer.reply = body.data;
  		}else{
  			console.log("TEST2");
  			var body = {'type' : 'text' , 'data' : reply};
  			answer.type = 'text';
  			answer.reply = body.data;
  			console.log(answer);

  		}
  		console.log(answer);
  		// Send the JSON response.
  		res.json(answer);
  	}).catch(function(err) {
      console.log(err);
  		console.log(JSON.stringify(err));
  		res.json({
  			"status": "error",
  			"error": JSON.stringify(err)
  		});
  	});
  }

  /* error handler */
  function error_handler (loadcount, err) {
  	console.log("Error loading batch #" + loadcount + ": " + err + "\n");
  }

  function error(res, message) {
  	res.json({
  		"status": "error",
  		"message": message
  	});
  }

module.exports = chat;
