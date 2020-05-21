/**
 * Created by samarth on 20/04/17.
 */
'use strict';

User.prototype.setFirstName = function (firstName) {
    this.firstName = firstName;
};
User.prototype.setLastName = function (lastName) {
    this.lastName = lastName;
};
User.prototype.setSchools = function (schools) {
    if(schools instanceof Array){
        this.schools = schools;
    }
};
function User(){
    this.firstName;
    this.lastName;
    this.schools;
    this.profilePhotoUrl;
}
module.exports = User;
