var express = require('express');
var qs = require('querystring');
var fs = require('fs');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.render('kubo_test/template', { title: 'jQuery mobile テストページ' });
});

/* 処理１ */
router.get('/data', function(req, res, next) {
	var data = module1.process1(req);
	res.render('kubo_test/template', data);
});

module.exports = router;
