/**
 * 验证jwt
 */
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const keys = require("./keys");
const mongoose = require("mongoose");
const User = mongoose.model("User")


const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretKey;


module.exports = passport => {

    passport.use(new JwtStrategy(opts, async function (jwt_payload, done) {
        // console.log(jwt_payload);

        const user = await User.findById(jwt_payload.id)

        // console.log(user);
        if (user) {
            console.log("验证成功");
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    }))
}