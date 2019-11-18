var express = require('express');
var router = express.Router();
var objectId = require('mongodb').ObjectID;
var assert = require('assert');

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

router.get('/get-data', function(req, res, next) {
    var resultArray = [];
    var resultArray2 = [];
    MongoClient.connect(uri,{ useUnifiedTopology: true }, function(err, client) {
        const collection = client.db("smartkart").collection("cart");
        assert.equal(null, err);
        var cursor = collection.find();
        cursor.forEach(function(doc, err) {
            assert.equal(null, err);
            resultArray.push(doc);
            resultArray2.push(doc.findOne("category"));
        }, function() {
            client.close();
            res.render('index', {items: resultArray,item: resultArray2});
        });
    });
});

router.post('/insert', function(req, res, next) {
    console.log("insert");
    var item = {
        url: req.body.url,
        name: req.body.name,
        price: req.body.price
    };


    MongoClient.connect(uri,{ useUnifiedTopology: true }, function(err, client) {
        const collection = client.db("smartkart").collection("cart");
        console.log('Connected...');
        assert.equal(null, err);
        collection.insertOne(item,function(err,res){
            console.log("data inserted");
        });
        client.close();
    });


    res.redirect('/');
});



module.exports = router;
