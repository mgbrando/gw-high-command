const {BasicStrategy} = require('passport-http');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

mongoose.Promise = global.Promise;
const jsonParser = require('body-parser').json();
const {Guild} = require('../models/guild');
const {Leader} = require('../models/leader');


router.use(jsonParser);

const strategy = new BasicStrategy(
  (username, password, cb) => {
    Leader
      .findOne({username})
      .exec()
      .then(leader => {
        if (!leader) {
          return cb(null, false, {
            message: 'Incorrect username'
          });
        }
        if (leader.password !== password) {
          return cb(null, false, 'Incorrect password');
        }
        return cb(null, leader);
      })
      .catch(err => cb(err))
});

passport.use(strategy);

//Register Guild Leader
router.post('/', (req, res) => {
	if (!req.body) {
    	return res.status(400).json({message: 'No request body'});
  	}

  	if (!('username' in req.body)) {
    	return res.status(422).json({message: 'Missing field: username'});
  	}

  	let {username, password, handleName, apiKey, guildsIds} = req.body;

  	if (typeof username !== 'string') {
    	return res.status(422).json({message: 'Incorrect field type: username'});
  	}

  	username = username.trim();

  	if (username === '') {
    	return res.status(422).json({message: 'Incorrect field length: username'});
  	}

  	if (!(password)) {
    	return res.status(422).json({message: 'Missing field: password'});
  	}

  	if (typeof password !== 'string') {
    	return res.status(422).json({message: 'Incorrect field type: password'});
  	}

  	password = password.trim();

  	if (password === '') {
    	return res.status(422).json({message: 'Incorrect field length: password'});
  	}
	/*if(!(req.params.id && req.body.id && req.params.id === req.body.id)){
		const message = `Request path id (${req.params.id}) and request body id (${req.body.id}) must match`;
		console.error(message);
		return res.status(400).json({message: message});
 	}
 	const toUpdate = {};
 	const updatableFields = ['formationId', 'playerPositions', 'description', 'notes', 'lastModified'];
 	updatableFields.forEach(field => {
 		if(field in req.body)
 			toUpdate[field] = req.body[field];
 	});
 	if(!toUpdate['lastModified'])
 		toUpdate['lastModified'] = new Date().toDateString();*/
 	let leader = null;
 	let guilds = [];
  	return Leader
    	.find({username})
    	.count()
    	.exec()
    	.then(count => {
      		if (count > 0) {
        		return Promise.reject({
          			name: 'AuthenticationError',
          			message: 'username already taken'
        		});
      		}
      	// if no existing user, hash password
      		return Leader.hashPassword(password)
    	})
    	.then(hash => {
      		return Leader
        		.create({
          			username: username,
          			password: hash,
          			handleName: handleName,
          			apiKey: apiKey,
          			guildIds: guildIds
        		})
    	})
    	.then(_leader => {
      		//return res.status(201).json(leader.apiRepr());
      		leader=_leader.apiRepr();
      		for(let i = 0; i < guildIds.length; i++){
      			guilds.push({id: guildIds[i], tasks: [], members: [{handleName: leader.handleName, apiKey: leader.apiKey}]});
      		}

      		return Guild
      				.create(guilds, (err, results) => {
      					if(err){
      						throw err;
      					}
      					else
      						return results;
      				});
    	})
    	.then(results => {console.log(results); res.status(201).json(leader);})
    	.catch(err => {
      		if (err.name === 'AuthenticationError') {
        		return res.status(422).json({message: err.message});
      		}
      		res.status(500).json({message: 'Internal server error'})
    	});
});

module.exports = router;