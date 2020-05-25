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
    res.render('index', {files: userService.getUserList()}, (err,page) => {
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

function toasteditorPageHandler(req,res){
    res.sendFile(path.join(__dirname,'../views/editor/toast_ui.html'),function (err) {
        if(err){
            res.send("not");
        }
    });
}


function sunEditorPageHandler(req,res){
    res.sendFile(path.join(__dirname,'../views/editor/sun_editor.html'),function (err) {
        if(err){
            res.send("not");
        }
    });
}

function joditEditorPageHandler(req,res){
    res.sendFile(path.join(__dirname,'../views/editor/jodit.html'),function (err) {
        if(err){
            res.send("not");
        }
    });
}

module.exports = function (app,db) {
    //Home page goes here
    app.get('/',homePageHandler);
    app.get('/about',aboutPageHandler);
    app.get('/toast-editor',toasteditorPageHandler);
    app.get('/sun-editor',sunEditorPageHandler);
    app.get('/jodit-editor',joditEditorPageHandler);
    app.get('/test',(req,res) => {
        res.sendFile(path.join(__dirname,'../views/test.html'),function (err) {
            if(err){
                res.send("not");
            }

        });

    });
};