var express = require('express');
var qs = require('querystring');
var fs = require('fs');
var router = express.Router();
var config = require('config');
process.env.http_proxy = config.env.http_proxy;
process.env.https_proxy = config.env.https_proxy;

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
	// data = JSON.stringify(data);
	console.log(data);
	res.json(data);
});

module.exports = router;
