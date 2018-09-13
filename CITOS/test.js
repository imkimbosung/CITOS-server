
// 지자체 농수축산물 물가조사가격 정보제공


/// 울산 시장 데이터
var request = require('request');
var parser = require('xml2json');

var url = 'http://data.ulsan.go.kr/rest/ulsanmarket/getUlsanmarketFile';
var queryParams = '?' + encodeURIComponent('ServiceKey') + 'servicekey'; /* Service Key*/
queryParams += '&' + encodeURIComponent('ServiceKey') + '=' + encodeURIComponent('-'); /* 공공데이터포털에서 받은 인증키 */
queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /* 페이지번호 */
queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10'); /* 한 페이지 결과 수 */
queryParams += '&' + encodeURIComponent('ulsanmarketEntId') + '=' + encodeURIComponent('284'); /* 고유번호 */

request({
    url: url + queryParams,
    method: 'GET'
}, function (error, response, body) {
    console.log('Status', response.statusCode);
    //console.log('Headers', JSON.stringify(response.headers));
    // console.log('Reponse received', body);
    var xml = body;
    var json = parser.toJson(xml);
    // console.log("to json -> %s", json.rfcOpenApi);
    var data = JSON.parse(json);
    // console.log(data.rfcOpenApi.body.data.list.length);
    var dataset = data.rfcOpenApi.body.data.list;
    const max = dataset.length;
    const min = 0;
    var i = Math.floor(Math.random() * (max - min)) + min;
    console.log(dataset[i]);
 

});


