'use strict';
const jwt = require('jsonwebtoken');

var UserServices = require('../services/UserServices');
var FileUploadService = require('../services/fileUploadService');
var Advice = require('./router-advice');
var path = require('path');
const logger = require('../utils/logger');
const passport = require('passport');
const Blog = require('../models/blogModel');
const secret = process.env.JWTSECRET || 'MOOBAALALALA';

module.exports = function (app, db) {

    let registerUser = async (req, res) => {
        let user = req.body;
        let registered = await UserServices.registerUser(db, user);
        if (registered) {
            res.json({result: {error: false, status: 'User Registered successfully'}});
        }
    };

    let login = async (req, res, next) => {
        let userDetails = req.body;
        let login = UserServices.login(db, userDetails).then(userDetails => {
            if (userDetails) {
                const payload = {
                    id: userDetails._id,
                    name: userDetails.firstName + " " + userDetails.lastName
                };
                const token = jwt.sign(payload, secret, {expiresIn: 36000}, (err, token) => {
                    if (err) {
                        res.status(500).json({
                            result: {
                                error: true,
                                status: 'Error Occurred',
                                message: err && err.message ? err.message : "Error in signing"
                            }
                        });
                    } else {
                        res.json({
                            result: {error: false, status: 'User logged in successfully'},
                            data: {userDetails: userDetails, token: `Bearer ${token}`}
                        });
                    }
                });
            }

        }).catch(err => {
            res.status(401).json({
                result: {
                    error: true,
                    status: 'Error Occurred',
                    message: err && err.message ? err.message : "Error in login to system with provided credentials"
                }
            })
        });
        // logger.info(login);
        // res.json({result: {error: false, status: 'User logged in successfully'}, data: login})
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
    let moveFileAndUpload = (img, uploadedUrls) => {
        logger.info('/tmp/' + img.name);
        let filepath = `/tmp/${img.name}`;
        img.mv(filepath);
        let generatedFile = `${randomString(32)}${path.extname(filepath)}`;
        var url = FileUploadService.uploadFile(filepath, generatedFile);
        uploadedUrls.push(url);
    };


    app.use('/api/**',passport.authenticate('jwt', {session:false}));

    app.get('/api/v2/get-user-info', (req, res) => {
        db.admin().listDatabases().then(d => res.json(d.databases));
        // res.json(UserServices.getUserList());
    });

    app.post('/v1/user/register', Advice(registerUser));

    app.post('/v1/user/login', Advice(login));

    app.get('/api/v1/user/id',Advice((req,res)=>{
        res.json("Hello there");
    }));

    app.post('/api/v2/image/upload', Advice(async (req, res) => {
        var imageFile = req.files.image;
        var uploadedUrls = [];
        if (imageFile instanceof Array) {
            imageFile.forEach(img => {
                moveFileAndUpload(img, uploadedUrls);
            });
        } else {
            moveFileAndUpload(imageFile, uploadedUrls);
        }
        var url = await Promise.all(uploadedUrls);
        res.json({result: {error: false, status: 'File uploaded successfully'}, data: {fileUrl: url}});
    }));

    app.put('/api/v2/blog/post', Advice(async (req, res) => {
        let blogBody = req.body;
        logger.info(blogBody);
        let blog = new Blog.BlogModel(blogBody);
        logger.info(blog.title);
        var bl = await db.collection('blog').insertOne(blog);
        res.status(200).json({result: {error: false, status: 'Blog success'}, data: {blog: bl.ops}});
    }));


};

