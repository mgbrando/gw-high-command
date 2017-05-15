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

router.post('/', jsonParser, (req, res) => {
		/*console.log(req.query);

		let guildIds=[];
		if(typeof req.query.guildids === "string")
			guildIds.push(req.query.guildids);
		else
			guildIds = [...req.query.guildids];

		const apiKey = req.query.apiKey;
		console.log(guildIds+' '+apiKey);*/
		const guilds = req.body.guilds;
		let guildIds = [];
		let guildDocuments = [];
    	for(let i=0; i < guilds.length; i++){
      		guildIds.push(guilds[i].guildId);
      		guildDocuments.push({id: guilds[i].guildId, name: guilds[i].guildName, tag: guilds[i].guildTag,  tasks: [], members: [{handleName:req.body.handleName, apiKey: req.body.apiKey}]});
    	}

		return Leader
			.create({
				username: req.body.username,
				password: req.body.password,
				handleName: req.body.handleName,
				apiKey: req.body.apiKey,
				guildIds: guildIds
			})
			.then(leader => {
				//res.status(201).json(leader.apiRepr());
				console.log('Hit line 43');
				Guild
					.insertMany(guildDocuments)
					.exec()
					.then(response => {
						const newGuildsAmount = response._id.length;
						res.status(201).json({message: `Added ${newGuildsAmount} guilds and 1 leader to the database.`});
					});
			})
			.catch(err => {
				console.log('Hit line 54');
				//console.error(err);
				res.status(500).json({message: 'Internal server error'});
			});
});

module.exports = router;