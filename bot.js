
// hydrabolt's implemenation of discord.js
var discord = require("discord.js");
// email and password of discordbot
var login = require("./auth");
// response json from seroz
var response = require("./response");
// fs to read/write json
var fs = require("fs");

const discordbot = new discord.Client();

//when the bot is ready
discordbot.on("ready", function () {
	console.log("Ready to begin! Serving in " + discordbot.channels.length + " channels");
});

//when the bot disconnects
discordbot.on("disconnected", function () {
	//alert the console
	console.log("Disconnected!");

	//exit node.js with an error
	process.exit(1);
});

discordbot.on("message", function(message){

    if (!message.content.startsWith("$")) return;

	message.content = message.content.substr(1);

	if (response.hasOwnProperty(message.content)) {
		discordbot.sendMessage(
			message.channel,
			response[message.content]
			);
	}
	
	if (message.content.startsWith("add")) {
		response[message.content.split(" ").slice(1)] = message.content.split(" ").slice(2);
		fs.writeFile('response.json', JSON.stringify(response), function(err){
			console.log(err);
		})
	}

	if (message.content === "stats") {
		message.reply([
			"I am connected/have access to:",
			`${discordbot.servers.length} servers`,
			`${discordbot.channels.length} channels`,
			`${discordbot.users.length} users`,
		].join("\n"));
	}

	if (message.content.startsWith("startplaying")) {
		var game = message.content.split(" ").slice(1).join(" ");
		discordbot.setPlayingGame(game);
	}

	if (message.content.startsWith("setname") && loose) {
		discordbot.setUsername(message.content.split(" ").slice(1).join(" ")).then(() => {
			message.reply("done!");
		});
	}		

	if(message.content.startsWith("ping"))
        	discordbot.reply(message, "really?");
});

discordbot.login(login.email, login.password);



// function logToChannel(message) {
// 	discordbot.sendMessage(discordbot.get('', message);


// }