
var MongoClient = require('mongodb').MongoClient;
var uri = 'mongodb+srv://joel:11223345@db-32rt2.mongodb.net/test?retryWrites=true&w=majority';

const functions = {
    bdcon(){

        MongoClient.connect(uri,{ useUnifiedTopology: true }, function(err, client) {
            const collection = client.db("smartkart").collection("cart");
            client.close();
        });
        return "connected";
    }
}


module.exports = functions;