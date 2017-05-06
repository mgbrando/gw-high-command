const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const jsonParser = require('body-parser').json();
const {Guild} = require('../models/guild');

router.use(jsonParser);

//Register Guild Member
router.post('/', (req, res) => {
	/*if (!req.body) {
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
  	}*/
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
 	const guildIds = req.body.guildIds;
 	const toUpdate = {members: req.body.member};

 	return Guild
 		.update({id: {$in: guildIds}}, {$addToSet: toUpdate})
 		.exec()
 		.then(() => {
 			res.status(204).end();
 		})
 		.catch(err => {
 			console.error(err);
 			res.status(500).json({message: 'Internal Service Error: '+err});
 		});
});


module.exports = router;