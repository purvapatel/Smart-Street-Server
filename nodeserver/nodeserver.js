var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('user:user@ds227555.mlab.com:27555/mobileuserdb',['UserDetails']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

//get list of users
app.get('/userlist', function (req, res) {
  console.log('I received a GET request');
	var name = req.params.name;
  db.UserDetails.find({}, function (err, docs) {
    console.log(docs);
    res.json(docs);
  });
});

//get user details
app.get('/userlist/:name', function (req, res) {
  console.log('I received a GET request');
	var name = req.params.name;
  db.UserDetails.find({"name" : req.params.name}, function (err, docs) {
    console.log(docs);
    res.json(docs);
  });
});

//insert user details
app.post('/userlist', function (req, res) {
  console.log(req.body);
  db.UserDetails.insert(req.body, function(err, doc) {
    res.json("1");
  });
});

app.listen(3000);
console.log("Server running on port 3000");
