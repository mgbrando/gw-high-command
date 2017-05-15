const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
/*const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();*/
const jsonParser = require('body-parser').json();
const {Guild} = require('../models/guild');
const {Leader} = require('../models/leader');


router.use(jsonParser);

//new stuff
/*const basicStrategy = new BasicStrategy(function(username, password, callback) {
  let leader;
  Leader
    .findOne({username: username})
    .exec()
    .then(_leader => {
      leader = _leader;
      if (!leader) {
        return callback(null, false, {message: 'Incorrect username'});
      }
      return leader.validatePassword(password);
    })
    .then(isValid => {
      if (!isValid) {
        return callback(null, false, {message: 'Incorrect password'});
      }
      else {
        return callback(null, leader);
      }
    });
});


passport.use(basicStrategy);
router.use(passport.initialize());*/

/*router.get('/',
  passport.authenticate('basic', {session: true}), //changed to true
  (req, res) => res.json({leader: req.leader.apiRepr()})
);*/
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
				console.log(leader["guildIds"]);
				res.json({guilds: leader.guildIds || []});
			})
			.catch(error => res.status(500).json({message: 'Internal server error - '+error}));
	}
	else if(req.query.username){
		Leader
			//.find({id: {$in: { guildIds }}, members: { $elemMatch: {handleName: {$in: guildIds}}}})
			.findOne({
					username: req.query.username
					//members: { $elemMatch: {handleName: {$ne: memberName}}}
				},
				{
    				"username": 1,
    				"_id": 0
				})
			.exec()
			.then(result => {
				//console.log(leader);
				if(result){
					res.json({unique: false});
					//res.json({message: `Username ${req.query.username} is valid`});
				}
				else
					res.json({unique: true});
					//res.json({leader: req.query.username || []});
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