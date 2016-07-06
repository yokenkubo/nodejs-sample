var express = require('express');
var qs = require('querystring');
var fs = require('fs');
var router = express.Router();

/* GET users listing. */
/* tadasuke */
router.get('/', function(req, res, next) {
	res.render('kamigou/eventList', { title: 'ここからデータが渡せます。' });
});

module.exports = router;
