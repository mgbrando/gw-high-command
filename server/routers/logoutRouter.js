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
  	console.log("MADE IT TO LOGOUT");
  	console.log(req.session.id);
	req.session.destroy(function (err) {
		if(err){
			res.send(err);
		}
		res.json({loggedout : true})
  	});
  });

module.exports = router;