
var MongoClient = require('mongodb').MongoClient;
var uri = 'mongodb+srv://joel:11223345@db-32rt2.mongodb.net/test?retryWrites=true&w=majority';

const functions = {
    dbcon(dbname, dbcol){

        MongoClient.connect(uri,{ useUnifiedTopology: true }, function(err, client) {
            const collection = client.db(dbname).collection(dbcol);
            client.close();
        });
        return "connected";
    },
    dbitem(itmurl,itmname,itemprice){

        var item = {
          url: itmurl,
          name: itmname,
          price: itemprice
        };
        return item.url;


    },
    dbinsert(dbname, dbcol,itmurl,itmname,itemprice){
        var item = {
            url: itmurl,
            name: itmname,
            price: itemprice
        };
        MongoClient.connect(uri,{ useUnifiedTopology: true }, function(err, client) {
          const collection = client.db(dbname).collection(dbcol);
          assert.equal(null, err);
          collection.insertOne(item,function(err,res){
          });
            return "data inserted!!!"
          client.close();
        });

    }
}


module.exports = functions;