function Commands(client, message, action) {
	this.client = client;
	this.message = message;
	this.action = action;
}

var Commands = {
	"help": {
		command: "help",
		usage: "",
		description: "returns a random gif matching the tags passed",
		action: () => {
			console.log(this.client);
			console.log(message);
			console.log(action);
		}
	}
};

Commands.prototype.listCommands = () => {
	var output = "```The following commands can be issued in any channel\n" +
				"use the mention feature to get my attention:\n";
	for(var action in commands) {
		output += commands[action].command + ": ";
		output += commands[action].usage ? 
			commands[action].usage : 'To be completed';
		output += commands[action].description ?
			commands[action].description : 'To be completed';
	}
	output += "```";
	return this.client.sendMessage(
			this.message.author,
			output
		);
}