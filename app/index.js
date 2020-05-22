'use strict';
process.on('uncaughtException', function (err) {
    console.log('Caught exception: ', err);
});
var express = require('express');
var expressLayouts = require('express-ejs-layouts');

var path = require('path');
const app = express();
var bodyParser = require('body-parser');

var port = process.env.PORT || 3000;
var User = require('./models/userModel');

var MongoClient = require('mongodb').MongoClient;
var uri = process.env.MONGO_ATLAS_URI || 'mongodb://localhost:27017';
if(uri){
    MongoClient.connect(uri, { useNewUrlParser: true ,useUnifiedTopology: true },function(err,db) {
        if (err) throw err;
        db.db().collection('tes').find().toArray(function (err,value) {
            console.log(value);
            db.close();
        });});
//     var client = new MongoClient(uri, { useNewUrlParser: true ,useUnifiedTopology: true });
//     client.connect();
// // perform actions on the collection object
//     });
}


//Template support added
app.set('views',path.join(__dirname,'/views'));
app.set('view engine','ejs');
app.use(expressLayouts);
//Serves static files like css & imgs from below static mapping
app.use(express.static(__dirname+'/public'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
// Configures handlers here
require('./routes/routes')(app);
app.listen(port,function(){
    console.log("Server started at port "+port);
});


