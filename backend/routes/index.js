var express = require('express');
var router = express.Router();
var assert = require('assert');
var Product = require('../models/product');
var Cart = require('../models/cart');



/* GET home page. */
router.get('/', function(req, res, next) {
  Product.find(function (err, docs) {
    res.render('index', {title : 'Smart Cart',items: docs});
  });
  // res.render('index');
});



router.get('/category/:name', function(req, res, next) {
  var cat = req.params.name;
  Product.find({category : cat}, function (err, docs) {
    res.render('category', {title : 'Smart Cart',items: docs});
  });
});





router.get('/add-to-cart-cat/:id/:cati',function (req, res) {
  console.log("eeee");
  var cat = req.params.cati;
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  Product.findById(productId,function (err,product) {
    if(err){
      return res.redirect('/category/cat');
    }
    cart.add(product, product.id);
    req.session.cart = cart;
    console.log(req.session.cart);
    res.redirect('/category/'+ cat);
  });
});

router.get('/add-to-cart/:id',function (req, res) {
  console.log("eeee");
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  Product.findById(productId,function (err,product) {
    if(err){
      return res.redirect('/');
    }
    cart.add(product, product.id);
    req.session.cart = cart;
    console.log(req.session.cart);
    res.redirect('/');
  });
});

router.get('/shopping-cart',function (req, res) {
  if(!req.session.cart){
    return res.render('cart',{products: null});
  }
  var cart = new Cart(req.session.cart)
  res.render('cart',{products: cart.generateArray(),totalPrice:cart.totalPrice});
});

router.get('/reduce/:id',function (req, res) {
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  cart.reduce(productId);
  req.session.cart = cart;
  res.redirect('/shopping-cart');
});

router.get('/increase/:id',function (req, res) {
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  cart.increase(productId);
  req.session.cart = cart;
  res.redirect('/shopping-cart');
});


//
// router.get('/category/:name', function(req, res, next) {
//   var resultArray = [];
//   var cat = req.params.name;
//
//   MongoClient.connect(uri,{ useUnifiedTopology: true }, function(err, client) {
//     const collection = client.db("smartkart").collection("cart");
//     assert.equal(null, err);
//     var cursor = collection.find({category : cat});
//     cursor.forEach(function(doc, err) {
//       assert.equal(null, err);
//       resultArray.push(doc);
//     }, function() {
//       client.close();
//       console.log(resultArray);
//       res.render('index', {items: resultArray});
//     });
//   });
// });
//
//
//
//


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
