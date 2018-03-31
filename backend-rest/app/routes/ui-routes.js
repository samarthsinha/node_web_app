/**
 * Created by samarth on 20/04/17.
 */
'use strict';

const fs = require('fs');
const userService = require('../services/UserServices');
const Logger = require('../utils/logger');
const path = require('path');

var logger = new Logger(Logger.ERROR);
function homePageHandler(req,res) {
    logger.info("skklds");
    logger.error("sdas");
    res.render('index', {files: userService.getUserList()},function (err,page) {
        if(err){
            logger.error("Error in rendering home page",err);
            res.send("Error in rendering home page");
            return;
        }
        res.send(page);
    });
}

function aboutPageHandler(req,res){
        res.render('about');
}

module.exports = function (app) {
    //Home page goes here
    app.get('/',homePageHandler);
    app.get('/about',aboutPageHandler);
    app.get('/test',function (req,res) {
        res.sendFile(path.join(__dirname,'../views/test.html'),function (err) {
            if(err){
                res.send("not");
            }

        });

    });
};