var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var uuid = require('uuid');


MongoClient.connect('mongodb://127.0.0.1:27017/test', function(err, db) {
  if (err) {
    throw err;
  }


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
  // index.jade needs a form to submit a URL for shortening


router.post('/', function(request, response) {
  var myString = uuid.v4();
  var collection = db.collection('urls');
  var shortUrl = 'bbb'
  collection.insert({
  	_id: myString,
  	shortened: shortUrl,
  	target: request.body.EnterURL
  	// clicks: 0
  }, function(err, docs) {
    response.redirect('/info/' + shortUrl);
  });
});

router.get('/info/:shortUrl', function(request, response) {
  var collection = db.collection('urls'),
      shortUrl = request.params.shortUrl;
  collection.find({'shortened': shortUrl}, function(err, url) {
    response.render('info', {url: url, shortUrl: shortUrl});
  });
});

router.get('/:shortUrl', function(request, response) {
  	var collection = db.collection('urls'),
    	shortUrl = request.url;

  	console.log('this is shorty', shortUrl);
  	collection.find().toArray(function(err, results) {
    	console.dir(results);
      	db.close();
      	var target = results.reduce(function(retUrl, curr) {
      		if (curr.shortened === shortUrl) {
      		return curr.target;
      		}
    	});
      response.redirect(target);
    });
  // collection.find({'shortened': shortUrl}, function(err, url) {
  //   console.log("booyah", url.shortUrl);
  //   
  // });
});
});

module.exports = router;

