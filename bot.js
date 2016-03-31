
// hydrabolt's implemenation of discord.js
var Discord = require("discord.js");
// email and password of discordbot
var Login = require("./auth");
// response json from seroz
var Response = require("./response");
// fs to read/write json
var fs = require("fs");

const discordbot = new Discord.Client();

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

	if (Response.hasOwnProperty(message.content)) {
		discordbot.sendMessage(
			message.channel,
			Response[message.content]
			);
	}
	
	if (message.content.startsWith("add")) {
		Response[message.content.split(" ").slice(1)] = message.content.split(" ").slice(2);
		fs.writeFile('response.json', JSON.strijgify(response), function(err){
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

discordbot.login(Login.email, Login.password);



// function logToChannel(message) {
// 	discordbot.sendMessage(discordbot.get('', message);


// }