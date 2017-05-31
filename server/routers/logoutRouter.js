const {BasicStrategy} = require('passport-http');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

mongoose.Promise = global.Promise;
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

router.use(jsonParser);

module.exports = function(passport){
  router.get('/', (req, res) => {
  	console.log("MADE IT TO LOGOUT");
  	console.log(req.session.id);
  	/*req.logout();
  	req.session.destroy();
  	res.redirect('/');*/
    req.logout();
    console.log("ISAUTHENTICATED?: "+req.isAuthenticated());
    req.session.reset();
    req.session.destroy(function (err) {
        if (err) {
            return next(err);
        }

        // destroy session data
        req.session = null;
        res.clearCookie('gw2highcommand', {path:'/'});
        res.cookie('gw2highcommand', '', {expires: new Date(0)});
        // redirect to homepage
        res.json({redirect: '/'});
        //res.redirect('/');
    });
 	/*req.session.destroy(function (err) {
    	res.cookie('gw2highcommand', "", { expires: new Date() });
  		console.log("LINE 25"+req.session);
  		res.end();
    });*/
  	//req.session.destroy(function (err) {
    //	res.redirect('/'); //Inside a callback… bulletproof!
  	//});
  	//return res.redirect('/');
  	//return res.end();
  });

  return router;
};