var express = require('express');
var qs = require('querystring');
var fs = require('fs');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	var file_name = req.query.file_name;
    var msg = file_name == undefined ? '詳細ページ' : file_name;
	res.render('kamigou/eventDetail', { title: msg, file_name: msg });
});

/* POST users listing. */
router.post('/', function(req, res, next) {
	var file_name = req.body['file_name'];
	var msg = file_name == undefined ? '詳細page' : file_name;
	res.render('kamigou/eventDetail', { title: msg, file_name: msg });
});

module.exports = router;
