var Product = require('../models/product');
var mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/cart',{ useUnifiedTopology: true,useNewUrlParser: true});

var products = [
    // new Product({
    //     url: ".\images\okra.jpg",
    //     name: "Okra",
    //     wprice: 1.30,
    //     fprice: 1.43,
    //     category: "Vegetables"
    // }),
    // new Product({
    //     url: ".\images\red_apple.jpg",
    //     name: "Apple",
    //     wprice: 1.99,
    //     fprice: 2.31,
    //     category: "Fruits"
    // }),
    // new Product({
    //     url: ".\images\banana.jpg",
    //     name: "Banana",
    //     wprice: 0.99,
    //     fprice: 1.20,
    //     category: "Fruits"
    // }),
    // new Product({
    //     url:".\images\kiwi.jpg",
    //     name: "Kiwi",
    //     wprice: 1.32,
    //     fprice: 1.55,
    //     category: "Fruits"
    // }),
    // new Product({
    //     url: ".\images\cabbage.jpg",
    //     name: "Cabbage",
    //     wprice: 1.00,
    //     fprice: 1.20,
    //     category: "Vegetables"
    // }),
    // new Product({
    //     url: ".\images\lettuce.jpg",
    //     name: "Lettuce",
    //     wprice: 1.32,
    //     fprice: 1.55,
    //     category: "Vegetables"
    // }),
    // new Product({
    //     url: ".\images\rice.png",
    //     name: "Fried Rice",
    //     wprice: 1.20,
    //     fprice: 1.35,
    //     category: "Frozen Foods"
    // }),
    // new Product({
    //     url: ".\images\dumpling.jpg",
    //     name: "Chicken Dumpling",
    //     wprice: 3.32,
    //     fprice: 3.55,
    //     category: "Frozen Foods"
    //
    // }),
    new Product({
        url: ".\images\pasta.jpg",
        name: "Chicken Pasta",
        wprice: 4.30,
        fprice: 4.10,
        category: "Frozen Foods"
    })
];

var done = 0;
for (var i = 0; i< products.length; i++){
    products[i].save(function (err,result) {
        done++;
        if(done=== products.length){
            exit();
        }

    });
}

function exit(){
    mongoose.disconnect();
}