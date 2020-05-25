'use strict';
process.on('uncaughtException', function (err) {
    console.log('Caught exception: ', err);
});
var express = require('express');
var expressLayouts = require('express-ejs-layouts');
var cors = require('cors');
var path = require('path');
var fileUpload = require('express-fileupload');
const app = express();
var port = process.env.PORT || 3000;

var MongoClient = require('./utils/mongoclient');
var routes = require('./routes/routes');



MongoClient().then(db => {
    //Template support added
    app.set('views',path.join(__dirname,'/views'));
    app.set('view engine','ejs');
    app.use(cors({exposedHeaders:['Authorization']}));
    app.use(expressLayouts);
    //Serves static files like css & imgs from below static mapping
    app.use(express.static(__dirname+'/public'));
    app.use(express.json());
    app.use(express.urlencoded({
        extended: true
    }));
    app.use(fileUpload({
        useTempFiles : true,
        tempFileDir : '/tmp/'
    }));
    const jsonErrorHandler =  async (err, req, res, next) => {
        if (!module.parent) console.error(err.stack);
        res.status(500);
        res.json({result: {error:true,message:err.message}});
        next();
    };
    app.use(jsonErrorHandler);
    //Configures handlers here
    routes(app,db).listen(port,function(){
        console.log("Server started at port "+port);
    });
});


