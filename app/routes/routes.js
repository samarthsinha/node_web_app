'use strict';
//Require express
const  restApi = require('./rest-api');
const  uiHandlers = require('./ui-routes');
module.exports = function(app){
    restApi(app);
    uiHandlers(app);
};

