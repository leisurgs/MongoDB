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

router.get('/', function(request, response) {
  var url = request.body.EnterURL;
  var alterUrl = myString.set(url);
  db.inventory.insert{
  	url: url,
  	alterUrl: alterUrl
  }
  response.render('index', {
  	title: "Here is your shortened url.",
  	user: null,
  	alterUrl: alterUrl
  });
  // index.jade needs a form to submit a URL for shortening
});

router.post('/', function(request, response) {
  var collection = db.collection('urls');
  collection.insert({/*info you generate*/}, function(err, docs) {
    response.redirect('/info/' + shortUrl);
  });
});

router.get('/info/:shortUrl', function(request, response) {
  var collection = db.collection('urls'),
      shortUrl = request.params.shortUrl;
  collection.find({'shortened': shortUrl}, function(err, url) {
    response.render('info', {url: url});
  });
});

router.get('/:shortUrl', function(request, response) {
  var collection = db.collection('urls'),
      shortUrl = request.params.shortUrl;
  collection.find({'shortened': shortUrl}, function(err, url) {
    response.redirect(url.target);
  });
});

module.exports = router;
