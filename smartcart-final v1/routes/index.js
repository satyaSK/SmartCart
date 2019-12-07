var express = require('express');
var router = express.Router();
var assert = require('assert');
var Product = require('../models/product');
var Cart = require('../models/cart');



/* GET home page. */
router.get('/', function(req, res, next) {
  var successMsg = req.flash('success')[0];
  Product.find(function (err, docs) {
    res.render('index', {title : 'Smart Cart',items: docs, successMsg: successMsg, noMessages:!successMsg});
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

router.get('/checkout',  isLoggedIn, function(req,res, next){
  if(!req.session.cart){
    return redirect('/shopping-cart');
  }
  var cart=new Cart(req.session.cart);
  res.render('checkout',{total: cart.totalPrice});
});

router.post('/checkout', isLoggedIn, function(req,res,next){
  if(!req.session.cart){
    return redirect('/shopping-cart');
  }
  var cart=new Cart(req.session.cart);
  req.flash('success','Successfully brought product ..');
  req.session.cart=null;
  res.redirect('/');
});



module.exports = router;

function isLoggedIn(req,res,next) {
  if(req.isAuthenticated()){
    return next();
  }
  req.session.oldUrl=req.url;
  res.redirect('/users/signin');
}
