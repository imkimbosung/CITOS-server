var express = require('express');
var router = express.Router();
var fs = require('fs');
var openApiURL = 'http://aiopen.etri.re.kr:8000/WiseASR/Recognition';
var accessKey = 'ab110332-dc45-4efa-89c5-b1e252088795';
var languageCode = 'korean'; // code: korean or english
var audioFilePath = 'test4.m4a';
var audioData;

var audioData = fs.readFileSync(audioFilePath);

var requestJson = {
    'access_key': accessKey,
    'argument': {
        'language_code': languageCode,
        'audio': audioData.toString('base64')
    }
};

var request = require('request');
var options = {
    url: openApiURL,
    body: JSON.stringify(requestJson),
    headers: {'Content-Type':'application/json; charset=UTF-8'}
};

request.post(options, function (error, response, body) {
    console.log('responseCode = ' + response.statusCode);
    console.log('responseBody = ' + body);
});

module.exports = router;
