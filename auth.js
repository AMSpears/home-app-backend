// user authentication modified from https://blog.jscrambler.com/implementing-jwt-using-passport/
var passport = require("passport");
var passportJWT = require("passport-jwt");
var cfg = require("./config.js");
var ExtractJwt = passportJWT.ExtractJwt;
var Strategy = passportJWT.Strategy;
const User = require('./db/schema').User
var params = {
    secretOrKey: cfg.jwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

module.exports = function() {
    var strategy = new Strategy(params, function(payload, done) {
        var user = User.findById(payload.id) || null;
        if (user) {
            return done(null, {
                id: user.id
            });
        } else {
            return done(new Error("User not found"), null);
        }
    });
    passport.use(strategy);
    return {
        initialize: function() {
            return passport.initialize();
        },
        authenticate: function() {
            return passport.authenticate("jwt", cfg.jwtSession);
        }
    };
};
