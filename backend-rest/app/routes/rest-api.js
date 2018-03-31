'use strict';

var UserServices = require('../services/UserServices');

module.exports = function(app) {

    app.post('/api/v1/get-user-info', function(req, res) {
        console.log(req.form);
        res.json(UserServices.getUserList());
    });
};

