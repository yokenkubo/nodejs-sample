var express = require('express');
var qs = require('querystring');
var fs = require('fs');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/data1', function(req, res, next) {
	res.send('{key1:"value1"}');
});

router.get('/template', function(req, res, next) {
	res.render('test/template', { title: 'Express' });
});

router.post('/template/marker', function(req, res, next) {
	console.log("start post /template/marker");
	try {
		var strJson = fs.readFileSync('data/data.json', 'utf8');
		var data = JSON.parse(strJson);
	} catch (e) {
		var data = [];
	}
	data.push(req.body)
	console.log(data);
	fs.writeFile('data/data.json', JSON.stringify(data, null, '    '));
	res.send('OK');
});

router.get('/template/marker', function(req, res, next) {
	console.log("start get /template/marker");
	try {
		var strJson = fs.readFileSync('data/data.json', 'utf8');
		var data = JSON.parse(strJson);
	} catch (e) {
		var data = [];
	}
	data = JSON.stringify(data);
	console.log(data);
	res.send(data);
});

router.get('/template/arrow.svg', function(req, res, next) {
	console.log("start get /template/arrow.svg");
	var triData = "";
	triData += '<svg width="200" height="200" viewBox="0 -0 200 200">';
	triData += '  <polygon points="0,50 50,100 0,150 200,100" fill="#ff0000" stroke="#ff0000" />';
	triData += '</svg>';
	res.writeHead(200, {'Content-Type': 'image/svg+xml'});
	res.send(triData);
});

module.exports = router;
