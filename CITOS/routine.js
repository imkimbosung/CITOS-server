var routine = {};
var request = require('request');

const ulsanPrice = require('./data/ulsan_0831.json');
const menu_info = require('./data/menu_info.json');
//=====================================================================
var getMenu = function (args, callback) {
	console.log('getMenu' + args);
	// console.log(menu_info);
		var search  = menu_info.filter((data)=>{
			if(data.menu == args){
				return data;
			}else if(data.number == args){
				return data;
			}
		});
		if(search.length != 1){
			var price = "물품을 찾지 못했어요."
		}else{
			var price = search[0].menu + " 의 가격은 " + search[0].price + " 원입니다.";
		}
		console.log(search)
			callback.call(this, null, price);

}
//=====================================================================
var getItemPrice = function(args, callback){
	console.log("getItemPrice" + args);
	// console.log(ulsanPrice);
    var search = ulsanPrice.filter((data)=>{
        if(data.item == args){
            return data;
        }
	})
	if(search.length != 1){
		var price = "물품을 찾지 못했어요."
	}else{
		var price = search[0].item + "의 가격은 " + search[0].unit +","+ search[0].week + "원입니다.";
	}
	console.log(search)
    callback.call(this, null, price);
}

var getItemPriceWeekAgo = function(args, callback){
	console.log("weekago" + args);
	// console.log(ulsanPrice);
    var search = ulsanPrice.filter((data)=>{
        if(data.item == args){
            return data;
        }
	})
	if(search.length != 1){
		var price = "물품을 찾지 못했어요."
	}else{
		var price = "일주일 전," + search[0].item + "의 가격은 " + search[0].unit +","+ search[0].one_week_age + "원입니다.";
	}
	console.log(search)
    callback.call(this, null, price);
}


var request = require('request');
var parser = require('xml2json');

var url = 'http://data.ulsan.go.kr/rest/ulsanmarket/getUlsanmarketFile';
var queryParams = '?' + encodeURIComponent('ServiceKey') + '=6uY%2FN9EJuw9EzkCGXCpjBv3SI5SWNGgO%2BZWVhDNgZvDaTzPrR1KEtA20pN6JDjFgMT%2BArEEY4FvSqJQxWK%2BU3g%3D%3D'; /* Service Key*/
queryParams += '&' + encodeURIComponent('ServiceKey') + '=' + encodeURIComponent('-'); /* 공공데이터포털에서 받은 인증키 */
queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /* 페이지번호 */
queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10'); /* 한 페이지 결과 수 */
queryParams += '&' + encodeURIComponent('ulsanmarketEntId') + '=' + encodeURIComponent('284'); /* 고유번호 */

var getMarket = function(args, callback){
	request({
		url: url + queryParams,
		method: 'GET'
	}, function (error, response, body) {
		console.log('Status', response.statusCode);
		//console.log('Headers', JSON.stringify(response.headers));
		// console.log('Reponse received', body);
		var xml = body;
		var json = parser.toJson(xml);
		var data = JSON.parse(json);
		// console.log(data.rfcOpenApi.body.data.list.length);
		var dataset = data.rfcOpenApi.body.data.list;
		const max = dataset.length;
		const min = 0;
		var i = Math.floor(Math.random() * (max - min)) + min;
		console.log(dataset[i]);
		callback.call(this, null,dataset[i].fileUrl);
	});
}

routine.getMenu = getMenu;
routine.getItemPrice = getItemPrice;
routine.getMarket = getMarket;
routine.getItemPriceWeekAgo = getItemPriceWeekAgo;
module.exports = routine;
