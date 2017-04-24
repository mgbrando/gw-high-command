

onmessage = function(e){
	fetch('https://api.guildwars2.com/v2/guild/${e.guildID}/log?since=${e.logEntryID}')
	.then(newLogEntries => {
		postMessage(newLogEntries);
	})
}