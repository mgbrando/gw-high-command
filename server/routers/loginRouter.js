const {BasicStrategy} = require('passport-http');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

mongoose.Promise = global.Promise;
const jsonParser = require('body-parser').json();
const {Guild} = require('../models/guild');
const {Leader} = require('../models/leader');


router.use(jsonParser);

//Leader Login
const basicStrategy = new BasicStrategy(function(username, password, callback) {
  let leader;
  Leader
    .findOne({username: username})
    .exec()
    .then(_leader => {
      leader = _leader;
      if (!leader) {
        return callback(null, false, {message: 'Incorrect username'});
      }
      return leader.validatePassword(password);
    })
    .then(isValid => {
      if (!isValid) {
        return callback(null, false, {message: 'Incorrect password'});
      }
      else {
        return callback(null, leader);
      }
    });
});


passport.use(basicStrategy);
router.use(passport.initialize());

router.get('/',
  passport.authenticate('basic', {session: true}), //changed to true
  (req, res) => res.json({leader: req.leader.apiRepr()})
);


module.exports = {router};