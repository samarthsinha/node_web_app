'use strict';

var UserServices = require('../services/UserServices');
var FileUploadService = require('../services/fileUploadService');
var Advice = require('./router-advice');
var path = require('path');

module.exports = function(app,db) {

    let registerUser = async (req,res) => {
            let user = req.body;
            let registered = await UserServices.registerUser(db,user);
            if(registered){
                res.json({result: {error: false, status: 'User Registered successfully'}});
            }
    };

    let login = async (req, res) => {
        let userDetails = req.body;
        let login = await UserServices.login(db,userDetails);
        console.log(login);
        res.json({result: {error: false, status: 'User logged in successfully'},data:login})
    };

     let randomString = (length) => {
        let radom13chars = function () {
            return Math.random().toString(16).substring(2, 15)
        };
        let loops = Math.ceil(length / 13)
        return new Array(loops).fill(radom13chars).reduce((string, func) => {
            return string + func()
        }, '').substring(0, length)
    };

    /** Returns URL promise **/
    let moveFileAndUpload = (img,uploadedUrls) => {
        console.log('/tmp/' + img.name);
        let filepath = `/tmp/${img.name}`;
        img.mv(filepath);
        let generatedFile =  `${randomString(32)}${path.extname(filepath)}`;
        var url = FileUploadService.uploadFile(filepath,generatedFile);
        uploadedUrls.push(url);
    };

    app.post('/api/v1/get-user-info', (req, res) =>{
        db.admin().listDatabases().then(d => res.json(d.databases));
        // res.json(UserServices.getUserList());
    });

    app.post('/api/v1/user/register', Advice(registerUser));

    app.post('/api/v1/user/login',Advice(login));

    app.post('/api/v1/image/upload',Advice(async (req, res)=>{
        var imageFile = req.files.image;
        var uploadedUrls = [];
        if(imageFile instanceof Array){
            imageFile.forEach(img =>{
                moveFileAndUpload(img,uploadedUrls);
            });
        }else{
            moveFileAndUpload(imageFile,uploadedUrls);
        }
        var url = await Promise.all(uploadedUrls);
        res.json({result: {error: false, status: 'File uploaded successfully'},data:{fileUrl: url}});
    }));



};

