



// hydrabolt's implemenation of discord.js
var Discord = require("discord.js");
// Email and Password of discordbot
var Login = require("./auth.json");
// Maid-chan json from seroz
var maidchan = require("./maid-chan");

var discordbot = new Discord.Client();


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

discordbot.on("message", function(msg){

    if (!msg.content.startsWith("$")) return;

	msg.content = msg.content.substr(1);

	if(maidchan.hasOwnProperty(msg.content)) {
		msg.sendMessage(msg.channel,maidchan[msg.content]);
	}

	if (msg.content === "stats") {
		msg.reply([
			"I am connected/have access to:",
			`${discordbot.servers.length} servers`,
			`${discordbot.channels.length} channels`,
			`${discordbot.users.length} users`,
		].join("\n"));
	}

	if (msg.content.startsWith("startplaying")) {
		var game = msg.content.split(" ").slice(1).join(" ");
		discordbot.setPlayingGame(game);
	}

	if (msg.content.startsWith("setname") && loose) {
		discordbot.setUsername(msg.content.split(" ").slice(1).join(" ")).then(() => {
			msg.reply("done!");
		});
	}		

	if(msg.content.startsWith("ping"))
        	discordbot.reply(msg, "really?");
});



discordbot.login(Login.email, Login.password);
