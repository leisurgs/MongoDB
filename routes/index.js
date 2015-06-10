var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var uuid = require('uuid');
var myString = uuid.v4();

MongoClient.connect('mongodb://127.0.0.1:27017/test', function(err, db) {
  if (err) {
    throw err;
  }
});
  

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

router.get('/', function(request, response) {
  var url = request.body.EnterURL;
  var alteredURL = client.set(url);
  MongoClient.insert
  response.render('index', {});
  // index.jade needs a form to submit a URL for shortening
});