var express = require('express');
var qs = require('querystring');
var fs = require('fs');
var du = require('date-utils');
var router = express.Router();
var weekDayList = [ "日", "月", "火", "水", "木", "金", "土" ] ;

/* GET users listing. */
router.get('/', function(req, res, next) {
	var dt = new Date();
	var formatted = dt.toFormat("YYYYMMDDHH24MISS");
	var reg=/(.*)(?:\.([^.]+$))/;
	var resultJson = [];
	var fileList = fs.readdirSync('data/event');

	fileList.forEach(function(fileName) {
		var targetYmd = fileName.match(reg)[1];
		targetYmd = targetYmd.replace('event','');
		if(targetYmd >= formatted) {
			// try-catchでthrowして中断
			try {
				var strJson = fs.readFileSync('public/event/' + fileName, 'utf8');
				var jsonData = JSON.parse(strJson);
			} catch (e) {
				var jsonData = [];
			}
			var dispDate = new Date();
			dispDate.setFullYear(targetYmd.substr(0,4));
			dispDate.setMonth(targetYmd.substr(4,2) - 1);
			dispDate.setDate(targetYmd.substr(6,2));
			dispDate.setHours(targetYmd.substr(8,2));
			dispDate.setMinutes(targetYmd.substr(10,2));
			var dispDateStr = dispDate.toFormat("YYYY/MM/DD") + '(' + weekDayList[dispDate.getDay()] + ')' + dispDate.toFormat("HH24:MI");
			var obj = {
				filename: fileName,
				date: dispDateStr,
				title: jsonData.title,
				picture: jsonData.picture
			};
			resultJson.push(obj);
		}
	});

	// console.log(JSON.stringify(resultJson));
	res.render('kamigou/eventList', {events: resultJson});
});

module.exports = router;
