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

router.get('/', jsonParser, (req, res) => {
	if(req.query){
		console.log(req.query);

		let guildIds=[];
		if(typeof req.query.guildids === "string")
			guildIds.push(req.query.guildids);
		else
			guildIds = [...req.query.guildids];

		const memberName = req.query.membername;
		console.log(guildIds+' '+memberName);
		Guild
			//.find({id: {$in: { guildIds }}, members: { $elemMatch: {handleName: {$in: guildIds}}}})
			.find({
				id: {$in: guildIds}, 
				members: { $elemMatch: {handleName: {$ne: memberName}}}
				},
				{
    				"id": 1,
    				"_id": 0
				})
			.exec()
			.then(guilds => {
				console.log(guilds);
				let gIDs = [];
				for(let i = 0; i < guilds.length; i++){
					gIDs.push(guilds[i].id);
				}
				res.json({guilds: gIDs});
			});
			//.catch(error => res.status(500).json({message: 'Internal server error - '+error}));
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
router.post('/create-guilds', (req, res) => {

});

module.exports = router;