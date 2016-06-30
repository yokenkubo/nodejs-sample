var express = require('express');
var qs = require('querystring');
var fs = require('fs');
var router = express.Router();
var config = require('config');
process.env.http_proxy = config.env.http_proxy;
process.env.https_proxy = config.env.https_proxy;
var gcloud = require('gcloud')({
	keyFilename: './resources/My Project-c29efc2230ee.json',
	projectId: 'loyal-burner-135023', 
});


var vision = gcloud.vision();

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

router.post('/template/vision', function(req, res, next) {
	res.send('respond with a resource');
});

router.get('/template/vision', function (req, res, next) {
	console.log("start GET /test/template/vision");
	vision.detect('resources/image.jpg', ['face', 'label'], function(err, detections, apiResponse) {
		console.log("start detect");
		var data = JSON.stringify(detections, null, "    ");
		console.log(err);
		console.log(data);
		console.log(apiResponse);
		console.log("end detect");
		res.send(data);
	});
	console.log("end GET /test/template/vision");
});

module.exports = router;
