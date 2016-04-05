var commands = {
	"help": {
		name: "help"
		usage: "prints out a list of commands",
		description: "returns a random gif matching the tags passed",
		action: (client, message, action) => {
			console.log(client);
			console.log(message);
			console.log(action);
		}
	}
};

exports.listCommands = (client, message) => {
	var output = "```The following commands can be issued in any channel\n" +
				"use the mention feature to get my attention:\n";
	for(var action in commands) {
		output += commands[action].name + ": ";
		output += commands[action].usage ? 
			commands[action].usage : 'To be completed';
		output += commands[action].description ?
			commands[action].description : 'To be completed';
	}
	output += "```";
	return client.sendMessage(
			message.author,
			output
		);
}