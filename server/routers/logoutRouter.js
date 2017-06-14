const {BasicStrategy} = require('passport-http');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

mongoose.Promise = global.Promise;
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

router.use(jsonParser);

  router.get('/', (req, res) => {
 	req.session.destroy(function (err) {
          res.redirect('/');
      }); 
  });

module.exports = router;