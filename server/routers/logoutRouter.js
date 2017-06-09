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
  	/*console.log("MADE IT TO LOGOUT");
  	console.log(req.session.id);*/
  	//console.log(req.session.passport);
  	req.logout();
	req.session.destroy(function (err) {
		if(err){
			res.send(err);
		}
		/*req.logout();
		req.logOut();*/
		req.session=null;
		//console.log(req.sessionStore);
		//console.log(req.sessionID);
		//delete req.sessionStore.sessions[req.sessionID];
		//console.log(req.sessionStore.sessions);
		//req.session.cookie = {};
		//req.clearCookie('gw2highcommand', {path: '/'});
		//res.clearCookie('gw2highcommand', {path: '/'});
      	/*req.sessionStore.regenerate(req, function (err) {
      		if (err) return callback(err)
      			res.send(err);
    	})*/
		//res.clearCookie('gw2highcommand', {path: '/'});
		//console.log("C is for COOKIE "+req.session.cookie);
		//res.signedCookies={};
		res.json({loggedout : true});
		//res.redirect('/login');
  	});
  });

module.exports = router;