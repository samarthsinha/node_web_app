/**
 * Created by samarth on 20/04/17.
 */
'use strict';

User.prototype.setFirstName =  (firstName) =>{
    this.firstName = firstName;
};
User.prototype.setLastName =  (lastName) => {
    this.lastName = lastName;
};

User.prototype.setEmail = (email) => this.email = email ;
User.prototype.setMobileNumber = (mobileNumber) => this.mobileNumber = mobileNumber;
User.prototype.setPassword = (password) => this.password = password;
User.prototype.setRole = (role) => this.role = role;
User.prototype.setProfilePhotoUrl = (profilePhotoUrl) => this.profilePhotoUrl = profilePhotoUrl;

function User(){
    this.firstName;
    this.lastName;
    this.password;
    this.email;
    this.mobileNumber;
    this.role;
    this.profilePhotoUrl;
}
module.exports = User;
