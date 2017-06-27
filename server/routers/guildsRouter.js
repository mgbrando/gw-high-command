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
					'members.handleName': {$ne: memberName}
					//members: { $elemMatch: {handleName: {$ne: memberName}}}
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

router.put('/:id/tasks', jsonParser, (req, res) => {
	Guild
		.findOneAndUpdate({id: req.params.id}, {$push: {tasks: {description: req.body.description, importance: req.body.importance}}}, {new: true})
		.then(guild => {
			console.log('Guild');
			console.log(guild);
			console.log('TASKS');
			console.log(guild.tasks);
			res.json(guild.tasks);
		})
		.catch(err => {
			console.log('PUT ERROR');
			console.log(err);
			res.status(500).json({message: err.message})
		});
	/*Guild
		.update({id: req.params.id}, {$push: {tasks: {description: req.body.description, importance: req.body.importance}}})
		.exec()
		.then(guild => {
			console.log('PUT COMPLETE');
			console.log(guild.task);
			res.json(guild.task);
		})
		.catch(err => {
			console.log('PUT ERROR');
			console.log(err);
			res.status(500).json({message: err.message})
		});*/
});

router.put('/:id/tasks/bulk-delete', jsonParser, (req, res) => {
	Guild
		.findOneAndUpdate({id: req.params.id}, {$set: {tasks: []}}, {new: true})
		.then((guild) => {
			console.log('Guild');
			console.log(guild);
			console.log('Tasks');
			console.log(guild.tasks);
			res.json(guild.tasks);
		})
 		.catch(err => {
 			console.error(err);
 			res.status(500).json({message: 'Internal Service Error: '+err});
 		});
});

router.put('/:id/tasks/:task_id', jsonParser, (req, res) => {
	Guild
		.findOneAndUpdate({id: req.params.id}, {$pull: {tasks: {_id: req.params.task_id}}}, {new: true})
		.then((guild) => {
			console.log('Guild');
			console.log(guild);
			console.log('Tasks');
			console.log(guild.tasks);
			res.json(guild.tasks);
		})
 		.catch(err => {
 			console.error(err);
 			res.status(500).json({message: 'Internal Service Error: '+err});
 		});
});

router.get('/:id/tasks', jsonParser, (req, res) => {
	Guild
		.findOne({id: req.params.id})
		.exec()
		.then(guild => {
			console.log('TASKS');
			console.log(guild.tasks);
			res.json(guild.tasks);
		})
 		.catch(err => {
 			console.error(err);
 			res.status(500).json({message: 'Internal Service Error: '+err});
 		});
});

router.put('/:id', jsonParser, (req, res) => {
    Guild
    	.findByIdAndUpdate(req.params.id, {$set: {members: req.body.members}})
    	.exec()
    	.then(() => {
 			res.status(204).end();
 		})
 		.catch(err => {
 			console.error(err);
 			res.status(500).json({message: 'Internal Service Error: '+err});
 		});
});

router.get('/:id/members', jsonParser, (req, res) => {
	console.log("Members route: "+req.params.id);
    Guild
    	.findOne({id: req.params.id})
    	.exec()
    	.then(guild => {
    		console.log(guild);
    		console.log(guild.members);
 			res.json(guild.members);
 		})
 		.catch(err => {
 			console.error(err);
 			res.status(500).json({message: 'Internal Service Error: '+err});
 		});
});

module.exports = router;