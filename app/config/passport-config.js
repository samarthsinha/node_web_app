const {Strategy, ExtractJwt} = require('passport-jwt');
//this is using ES6 Destructuring. If you're not using a build step,
//this could cause issues and is equivalent to
// const pp-jwt = require('passport-jwt');
// const Strategy = pp-jwt.Strategy;
// const ExtractJwt = pp-jwt.ExtractJwt;
const secret = process.env.JWTSECRET || 'MOOBAALALALA';
const User = require('../services/UserServices');
const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret
};
//this sets how we handle tokens coming from the requests that come
// and also defines the key to be used when verifying the token.
module.exports = (passport,db) => {
    passport.use(new Strategy(opts, async (payload, done) => {
            try{
                return done(null,payload);
            }catch (e) {
                err => done(null, false);
            }
        }));
};