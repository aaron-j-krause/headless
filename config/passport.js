'use strict';

const TwitterStrategy = require('passport-twitter').Strategy;
const keys = require('./keys');

module.exports = function(passport) {

  passport.use(new TwitterStrategy({    
    consumerKey     : keys.twitterAuth.consumerKey,
    consumerSecret  : keys.twitterAuth.consumerSecret,
    callbackURL     : keys.twitterAuth.callbackURL
  }));
};
