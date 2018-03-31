'use strict';
const User = require('../models/userModel');

var UserService = {};

/**
 * Business logic to fetch user info (can be paginated)
 * @returns {Array}
 */
UserService.getUserList = function (page,size) {
    var usersList = [];
    for(var i=0;i<10;i++){
        var userObj = new User();
        userObj.firstName = "Samarth"+i;
        userObj.lastName = "Sinha"+i;
        userObj.schools = [{"schoolName":"DAV Shyamali"}];
        usersList.push(userObj);
    }
    return usersList;
};

/**
 * Logic to fetch user by User ID;
 * @param id
 * @returns {{}}
 */
UserService.getUser = function (id) {
  return {};
};

module.exports = UserService;