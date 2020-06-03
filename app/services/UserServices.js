'use strict';
const EncUtils = require('../utils/encryptionUtils');
const User = require('../models/userModel');
const ObjectId = require('mongodb').ObjectId

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

class UserValidataionError extends Error{
    constructor(message) {
        return super(message);
    }
}


/**
 * Register user
 * @param db
 * @param userJson
 * @returns {Promise<boolean>}
 */
UserService.registerUser = async (db,userJson) => {
    if(userJson){
        if(!userJson.firstName){
            throw new UserValidataionError('First Name is required.');
        }
        if(!userJson.lastName){
            throw new UserValidataionError('Last Name is required.');
        }
        if(!userJson.email) {
            throw new UserValidataionError('Email is required.');
        }
        if(!userJson.password){
            throw new UserValidataionError('Password is required.');
        }
        var usr = new User();
        usr.email = userJson.email;
        usr.firstName = userJson.firstName;
        usr.lastName = userJson.lastName;
        usr.mobileNumber = userJson.mobileNumber;
        usr.role = 'USER';
        usr.password = EncUtils.cryptPassword(userJson.password);
        await db.collection('site_users').insertOne(usr);
        return true;
    }
    throw new UserValidataionError('User details required');
};

/**
 *  Login with credentials
 * @param db
 * @param userDetails
 * @returns {Promise<*>}
 */
UserService.login = async (db,userDetails) =>{
    if(userDetails){
        let userName = userDetails.username;
        let pwd = userDetails.password;
        let users = await db.collection('site_users').find({email: userName}).limit(1).toArray();
        if(users && users.length>0){
            if(!EncUtils.comparePassword(pwd,users[0].password)){
                throw new UserValidataionError('Username/Password incorrect');
            }
            delete users[0].password;
            return users[0];
        }else{
            throw new UserValidataionError('User not registered');
        }
    }
    return null;
};

/**
 * Logic to fetch user by User ID;
 * @param id
 * @returns {{}}
 */
UserService.getUserById = async function (id,db) {
    if(id){
        console.log(id);
        let users = await db.collection('site_users').find({_id: new ObjectId(id)}).toArray();
        if(users && users.length>0){
            delete users[0].password;
            return users[0];
        }else{
            throw new UserValidataionError('User not found');
        }
    }
    return null;
};

module.exports = UserService;

exports.UserValidataionError = UserValidataionError;