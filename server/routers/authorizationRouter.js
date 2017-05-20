//const {BasicStrategy} = require('passport-http');

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
//const passport = require('passport');
const jsonParser = require('body-parser').json();
const authenticated = require('../authenticated');

mongoose.Promise = global.Promise;  

module.exports = function(passport){
router.get('/', jsonParser, authenticated, (req, res) => {
  res.status(200).json({
        user: req.user.apiRepr(),
        message: `Welcome ${req.user.username}!`
  });
});
  return router;
}
//module.exports = router;