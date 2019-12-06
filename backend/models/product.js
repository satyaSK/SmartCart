var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    url: {type: String, required: true},
    name: {type: String, required: true},
    wprice: {type: Number, required: true},
    fprice: {type: Number, required: true},
    category: {type: String, required: true},
});

module.exports = mongoose.model('Product',schema);