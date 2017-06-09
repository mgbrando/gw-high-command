const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jsonParser = require('body-parser').json();
const authenticated = require('../authenticated');
//const passport = require('passport');

mongoose.Promise = global.Promise;  

module.exports = function(passport){
router.post('/', jsonParser, (req, res) => {
//console.log(req.session.passport.user);
//req.user
	console.log("SESSION _____");
	console.log(req.session);
   if(req.session.passport.user === req.body.userID)//req.isAuthenticated() && req.user)// === req.body.userId) //&& req.cookies['gw2highcommand'])
      return next();
   else
      return res.status(401).json({
        message: 'User not authenticated'
      });
	
  /*console.log(req.cookies);
  console.log(req.session.cookies);
  console.log("AUTHENTICATED: "+req.session);
  console.log("USERRRR: "+req.user.apiRepr().username);*/
  console.log('line 16');
  //console.log(req.session);
  return res.status(200).json({
        user: req.user.apiRepr()
        //message: `Welcome ${req.user.username}!`
  });
});
  return router;
};