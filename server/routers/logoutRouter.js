const {BasicStrategy} = require('passport-http');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

mongoose.Promise = global.Promise;
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

router.use(jsonParser);

router.post('/', (req, res) => {
	req.logout();
    req.session.destroy((err) => {
       if(err) {
         console.log(err);
       }
       res.redirect('/');
     });
  });

module.exports = router;