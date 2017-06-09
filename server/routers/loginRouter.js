//const {BasicStrategy} = require('passport-http');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
//const passport = require('passport');

mongoose.Promise = global.Promise;
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const {Guild} = require('../models/guild');
const {Leader} = require('../models/leader');


router.use(jsonParser);

module.exports = function(passport){
try{
  router.post('/', passport.authenticate('local', {session: true}), function(req, res, next) {
      console.log('Line 80 ');
      /*if (err) {
        return next(err);
      }*/
      console.log('Req.user line 83' + req.user);
      if (!req.user) {
        console.log('Req.user line 85' + req.user);
        return res.status(401).json({error: info.message});
      }
      /*console.log(req.session);
      return res.status(200).json({
          user: req.user.apiRepr()
          //message: `Welcome ${req.user.username}!`
      });*/
      req.login(req.user, loginErr => {
        if (loginErr) {
          console.log('Req.user line 90' + req.user);
          return res.status(401).json({error: loginErr});
        }
        console.log(`LOGGED IN: ${req.user.username}`);
        return res.status(200).json({
          user: req.user.apiRepr(),
          sessionID: req.sessionID
          //message: `Welcome ${req.user.username}!`
        });
      });
  });

  return router;
}
catch(error){
  console.log(error);
  throw error;
}
}

//module.exports = router;