var bcrypt = require('bcrypt-nodejs');


exports.cryptPassword = (password) => {
    return  bcrypt.hashSync(password,bcrypt.genSaltSync(10));
};

exports.comparePassword = (plainPass, hashword) => {
    var matched = bcrypt.compareSync(plainPass, hashword);
    return matched;
}