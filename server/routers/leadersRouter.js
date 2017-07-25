const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const jsonParser = require('body-parser').json();
const {Guild} = require('../models/guild');
const {Leader} = require('../models/leader');


router.use(jsonParser);

router.post('/', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (! user) {
      return res.status(401).json({
      error: 'Incorrect username or password'
    });
    }
    req.login(user, loginErr => {
      if (loginErr) {
        return res.status(401).json({
      error: loginErr
    });
      }
      return res.status(200).json({
      user: req.user.apiRepr(),
      message: `Welcome ${req.user.handleName}!`
    });
    });
  })(req, res, next);
});

//Old Stuff

router.get('/', jsonParser, (req, res) => {
	if(req.query.apikey){
		console.log(req.query);

		let guildIds=[];
		if(typeof req.query.guildids === "string")
			guildIds.push(req.query.guildids);
		else
			guildIds = [...req.query.guildids];

		console.log('line 26'+guildIds+' '+req.query.apikey);
		Leader
			.findOne({
					apiKey: req.query.apikey
				},
				{
    				"guildIds": 1,
    				"_id": 0
				})
			.exec()
			.then(leader => {
				console.log('line 39'+leader);
				if(leader)
					res.json({guilds: leader.guildIds || []});
				else
					res.json({guilds: []});
			})
			.catch(error => res.status(500).json({message: 'Internal server error - '+error}));
	}
	else if(req.query.username){
		Leader
			.findOne({
					username: req.query.username
				},
				{
    				"username": 1,
    				"_id": 0
				})
			.exec()
			.then(result => {
				if(result){
					res.json({unique: false});
				}
				else
					res.json({unique: true});
			})
			.catch(error => res.status(500).json({message: 'Internal server error - '+error}));
	}
	else{
		Guild
			.find()
			.exec()
			.then(guilds => {
				res.json(guilds);
			});
	}

});
router.put('/bulk-update', jsonParser, (req, res) => {
	if(!(req.body.memberName && req.body.apiKey && req.body.guildIds)){
		const message = 'Request must contain the member handleName, the member API Key, and the guildIds to add the player to.';
		console.error(message);
		return res.status(400).json({message: message});
 	}
	Guild
		.update(
			{id: {$in: req.body.guildIds}},
		 	{ $push: { members: {handleName: req.body.memberName, apiKey: req.body.apiKey} } }
		)
		.exec()
		.then(() => res.status(200).json({message: `Successfully added ${req.body.memberName} to guilds.`}))
		.catch(err => res.status(500).json({message: err.message}));
});
router.post('/create-guilds', (req, res) => {

});

module.exports = router;