
// hydrabolt's implemenation of discord.js
var discord = require("discord.js");
// response json from seroz
var response = require("./response");
// fs to read/write json
var fs = require("fs");

const discordbot = new discord.Client();

//when the bot is ready
discordbot.on("ready", function () {
	console.log(
		"Ready to begin! Serving in " + 
		discordbot.channels.length + 
		" channels"
		);
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
	
	if(message.content.startsWith("loading")) {
		var loading = ['|','/','-','\\'];
		discordbot.sendMessage(
			message,
			'`' + '|' + '`'
		).then(msg => {
			for(var i = 0; i < 30; i++) {
				discordbot.updateMessage(
					msg,
					'`' + loading[i % 4] + '`'
					);
			setTimeout(function() {}, 1500);
			console.log(i);
			}
		});
		console.log('end');
	}
	
	if (response.hasOwnProperty(message.content)) {
		discordbot.sendMessage(
			message.channel,
			response[message.content]
			);
	}
	
	if (message.content.startsWith("add")) {
			console.log(message.content.split(" ")[1]);
			console.log(message.content.split(" ").slice(2).join(" "));
		response[message.content.split(" ")[1]] = message.content.split(" ").slice(2).join(" ");
		fs.writeFile('response.json', JSON.stringify(response), function(err){
			console.log(err);
		})
		discordbot.sendMessage(
			message.channel,
			'`' + message.content.split(" ")[1] + '`' +
			" was added as a command by " +
			message.author
			);
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

	if (message.content.startsWith("setname")) {
		discordbot.setUsername(message.content.split(" ").slice(1).join(" ")).then(() => {
			message.reply("done!");
		});
	}

	if(message.content.startsWith("ping"))
        	discordbot.reply(message, "really?");
});

discordbot.login(process.env.EMAIL, process.env.PASSWORD, function(error, token){
	
});

// function logToChannel(message) {
// 	discordbot.sendMessage(discordbot.get('', message);


// }