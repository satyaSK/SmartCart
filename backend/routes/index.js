var express = require('express');
var router = express.Router();
var objectId = require('mongodb').ObjectID;
var assert = require('assert');
var Cart = require('../models/cart')

var MongoClient = require('mongodb').MongoClient;
var uri = 'mongodb+srv://joel:11223345@db-32rt2.mongodb.net/test?retryWrites=true&w=majority';
/* GET home page. */
router.get('/', function(req, res, next) {
  var resultArray = [];
  var categories = [];
  MongoClient.connect(uri,{ useUnifiedTopology: true }, function(err, client) {
    const collection = client.db("smartkart").collection("cart");
    assert.equal(null, err);
    var cursor = collection.find();
    cursor.forEach(function(doc, err) {
      assert.equal(null, err);
      resultArray.push(doc);
    }, function() {
      client.close();
      res.render('index', {items: resultArray});
    });
  });

  // res.render('index');
});

router.get('/add-to-cart/:id',function (req, res) {
  console.log("eeee");
  var product = req.params.id;
  console.log(product);
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  var result = [];
  MongoClient.connect(uri,{ useUnifiedTopology: true }, function(err, client) {
    const collection = client.db("smartkart").collection("cart");
    assert.equal(null, err);
    collection.findOne({_id: product}, function(err, document) {
      console.log(document.name);
      cart.add(document,document.id);
    });
    client.close();
  });
  req.session.cart = cart;
  console.log(req.session.cart);
  res.redirect('/');
});

router.get('/category/:name', function(req, res, next) {
  var resultArray = [];
  var cat = req.params.name;

  MongoClient.connect(uri,{ useUnifiedTopology: true }, function(err, client) {
    const collection = client.db("smartkart").collection("cart");
    assert.equal(null, err);
    var cursor = collection.find({category : cat});
    cursor.forEach(function(doc, err) {
      assert.equal(null, err);
      resultArray.push(doc);
    }, function() {
      client.close();
      console.log(resultArray);
      res.render('index', {items: resultArray});
    });
  });
});






  // var item = {
  //   url: req.body.url,
  //   name: req.body.name,
  //   price: req.body.price
  // };
  //
  //
  // MongoClient.connect(uri,{ useUnifiedTopology: true }, function(err, client) {
  //   const collection = client.db("smartkart").collection("cart");
  //   console.log('Connected...');
  //   assert.equal(null, err);
  //   collection.insertOne(item,function(err,res){
  //     console.log("data inserted");
  //   });
  //   client.close();
  // });


  //res.redirect('/');

// });














module.exports = router;
