const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const jsonParser = require('body-parser').json();
const {Guild} = require('../models/guild');
const {Leader} = require('../models/leader');


router.use(jsonParser);

router.post('/', jsonParser, (req, res) => {

		const guilds = req.body.guilds;
		let guildIds = [];
		let guildDocuments = [];
    	for(let i=0; i < guilds.length; i++){
      		guildIds.push(guilds[i].guildId);
      		guildDocuments.push({id: guilds[i].guildId, name: guilds[i].guildName, tag: guilds[i].guildTag,  tasks: [], members: [{handleName:req.body.handleName, apiKey: req.body.apiKey}]});
    	}
    	return Leader.hashPassword(req.body.password)
    	.then(hash => { 
		return Leader
			.create({
				username: req.body.username,
				password: hash,
				handleName: req.body.handleName,
				apiKey: req.body.apiKey,
				guildIds: guildIds
			})
			.then(leader => {

				Guild
					.insertMany(guildDocuments)
					.then(response => {
						const newGuildsAmount = response.length;
						res.status(201).json({message: `Added ${newGuildsAmount} guilds and 1 leader to the database.`});
					});
			})
			.catch(err => {
				res.status(500).json({message: 'Internal server error'});
			});
		});
});

module.exports = router;