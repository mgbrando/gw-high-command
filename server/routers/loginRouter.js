const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const {Guild} = require('../models/guild');
const {Leader} = require('../models/leader');


router.use(jsonParser);

module.exports = function(passport){
try{
  router.post('/', (req, res, next) => {
    passport.authenticate('local', {session: true}, (err, user, info) => {
        if (err) {
            return next(err); // will generate a 500 error
        }
        if (!user) {
            return res.send({ success : false, message : info.message || 'Failed' });
        }

        console.log('After they login:', user);
        req.logIn(user, (err) => {
            if (err) { return next(err); }
            return res.send({ success : true, message : 'Login success', user: user });
        });
    })(req, res, next);
});

  return router;
}
catch(error){
  console.log(error);
  throw error;
}
}
