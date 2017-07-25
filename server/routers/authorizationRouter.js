const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jsonParser = require('body-parser').json();
const authenticated = require('../authenticated');

mongoose.Promise = global.Promise;  

module.exports = function(passport){
  router.get('/', jsonParser, authenticated, (req, res) => {
    return res.status(200).json({user: req.user.apiRepr()});
  });

  return router;
};