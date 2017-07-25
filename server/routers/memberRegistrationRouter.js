const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const jsonParser = require('body-parser').json();
const {Guild} = require('../models/guild');

router.use(jsonParser);

//Register Guild Member
router.post('/', (req, res) => {

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