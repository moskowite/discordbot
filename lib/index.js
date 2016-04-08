
// hydrabolt's implemenation of discord.js
var Discord = require("discord.js");
// gcloud
var gcloud = require("gcloud");
// commands for the bot
var League = require("./league.js");
// fs to read/write json
var fs = require("fs");

var starttime = Date.now();
const DEBUG = true;
console.log(process.env);
const discordbot = new Discord.Client();
// const leaguejs = new League.Client();

// gcloud setup
var projectId = process.env.DATASTORE_PROJECT_ID || process.env.GCLOUD_PROJECT;
if (!projectId) {
  throw new Error('GCLOUD_PROJECT environment variable required.');
}
var keyFile = process.env.DATASTORE_KEYFILE ||
              process.env.GOOGLE_APPLICATION_CREDENTIALS;
var options = {
  projectId: projectId
};

if (keyFile) {
  options.keyFilename = keyFile;
}

var datastore = gcloud.datastore.dataset(options);


discordbot.login(process.env.EMAIL, process.env.PASSWORD, (error, token) => {
	DEBUG ? console.log(error) : null;
	DEBUG ? console.log(token) : null;
});

//when the bot is ready
discordbot.on("ready", (error) => {
	DEBUG ? console.log("Boot up at : " + starttime) : null;
	DEBUG ? console.log(error) : null;
	DEBUG ? console.log(
		"Ready to begin! Serving in " +
		discordbot.channels.length +
		" channels"
		) : null;
});

discordbot.on("message", (mention) => {
	// First we determine if client is mentioned
	// if client was not mentioned then return
	// we are only going to handle references to the bot via mention
	// also drop any message from
	if (mention.author.equals(discordbot.user) ||
		!mention.isMentioned(discordbot.user) ) return;
	// locate all mentions in the message
	var array = mention.mentions;
	// iterate through each mention and remove it from the message
	for(var i in array)
		mention.content = mention.content.replace(array[i].mention(), "");
	// strip out any mentions of everyone
	if(mention.everyoneMentioned)
		mention.content = mention.content.replace('@everyone', "");
	// trim up whitespace
	mention.content = mention.content.trim();
	// our action which we will direct into command
	var action = mention.content.split(" ")[0];
	// check to see if there was a command entered
	// if not alert the user to the help command
	// post a reply if no text is entered
	if(!action) {
		discordbot.sendMessage(
			mention.author,
			["***This is not a valid command.***",
			"Try:",
			mention.mentions + " **help**",
			"This will provide a list of commands"
			].join("\n"),
			(error, message) => {
					DEBUG ? console.log(message) : null;
			}
		);
		return;
	}
	// drop the action from the content array
	var response = mention.content.split(" ").slice(1);
	// evaluate the
	if (action == 'help') {
		Commands.listCommands(discordbot, mention);
	}
	
	DEBUG ? console.log(mention.content) : null;
	DEBUG ? console.log(action) : null;
	DEBUG ? console.log(response) : null;

	// console.log(!mention.isMentioned(discordbot.user));
	// console.log(mention.author.equals(discordbot.user));
	// console.log((!mention.isMentioned(discordbot.user) && !mention.author.equals(discordbot.user)));

	// console.log(mention.content);

	// var split = mention.content.split(" ");

	// for(r in split){
	// 	console.log(split[r]);
	// }

	// if (!msg.content.startsWith("?")) return;

	// msg.content = msg.content.substr(1);

	// if (msg.content.startsWith("help")) {
	// 	gettingStarted(discordbot, msg);
	// }

	// if (response.hasOwnProperty(msg.content)) {
	// 	discordbot.sendmsg(
	// 		msg.channel,
	// 		response[msg.content]
	// 		);
	// }

	// if (msg.content.startsWith("add")) {
	// 		console.log(msg.content.split(" ")[1]);
	// 		console.log(msg.content.split(" ").slice(2).join(" "));
	// 	response[msg.content.split(" ")[1]] = msg.content.split(" ").slice(2).join(" ");
	// 	fs.writeFile('response.json', JSON.stringify(response), (err) => {
	// 		console.log(err);
	// 	});
	// 	discordbot.sendmsg(
	// 		msg.channel,
	// 		'`' + msg.content.split(" ")[1] + '`' +
	// 		" was added as a command by " +
	// 		msg.author
	// 		);
	// }

	// if (msg.content === "stats") {
	// 	msg.reply([
	// 		"I am connected/have access to:",
	// 		`${discordbot.servers.length} servers`,
	// 		`${discordbot.channels.length} channels`,
	// 		`${discordbot.users.length} users`,
	// 	].join("\n"));
	// }

	// if (msg.content.startsWith("startplaying")) {
	// 	var game = msg.content.split(" ").slice(1).join(" ");
	// 	discordbot.setPlayingGame(game);
	// }

	// if (msg.content.startsWith("setname")) {
	// 	discordbot.setUsername(msg.content.split(" ").slice(1).join(" ")).then(() => {
	// 		msg.reply("done!");
	// 	});
	// }

	// if(msg.content.startsWith("ping"))
 //       	discordbot.reply(msg, "really?");
});

//when the bot disconnects
discordbot.on("disconnected", (error) => {
	//alert the console
	DEBUG ? console.log("Disconnected!") : null;
	if(error){
		DEBUG ? console.log(error) : null;
	}
	//exit node.js with an error
	process.exit(1);
});

// discordbot.on('debug', (err) => {
// 	console.log('debug');
// });

// discordbot.on('warn', (err) => {
// 	console.log('warn');
// });

// discordbot.on('messageDeleted', (err) => {
// 	console.log('messageDeleted');
// });

// discordbot.on('messageUpdated', (newmsg, oldmsg) => {
// 	console.log(newmsg);
// 	console.log(oldmsg);
// 	console.log('messageUpdated');
// });

// discordbot.on('error', (err) => {
// 	console.log('error');
// });

// discordbot.on('raw', (err) => {
// 	console.log('raw');
// });

// discordbot.on('serverCreated', (err) => {
// 	console.log('serverCreated');
// });

// discordbot.on('serverDeleted', (err) => {
// 	console.log('serverDeleted');
// });

// discordbot.on('serverUpdated', (err) => {
// 	console.log('serverUpdated');
// });

// discordbot.on('channelCreated', (err) => {
// 	console.log('channelCreated');
// });

// discordbot.on('channelDeleted', (err) => {
// 	console.log('channelDeleted');
// });

// discordbot.on('channelUpdated', (err) => {
// 	console.log('channelUpdated');
// });

// discordbot.on('serverRoleCreated', (err) => {
// 	console.log('serverRoleCreated');
// });

// discordbot.on('serverRoleDeleted', (err) => {
// 	console.log('serverRoleDeleted');
// });

// discordbot.on('serverRoleUpdated', (err) => {
// 	console.log('serverRoleUpdated');
// });

// discordbot.on('serverNewMember', (server, user) => {
// 	console.log('serverNewMember');
// });

// discordbot.on('serverMemberRemoved', (err) => {
// 	console.log('serverMemberRemoved');
// });

// discordbot.on('serverMemberUpdated', (err) => {
// 	console.log('serverMemberUpdated');
// });

// discordbot.on('presence', (err) => {
// 	console.log('presence');
// });

// discordbot.on('userTypingStarted', (err) => {
// 	console.log('userTypingStarted');
// });

// discordbot.on('userTypingStopped', (err) => {
// 	console.log('userTypingStopped');
// });

// discordbot.on('userBanned', (err) => {
// 	console.log('userBanned');
// });

// discordbot.on('userUnbanned', (err) => {
// 	console.log('userUnbanned');
// });

// discordbot.on('voiceJoin', (err, vchan, usr) => {
// 	console.log(err);
// 	console.log(usr);
// 	console.log('voiceJoin');
// });

// discordbot.on('voiceLeave', (err) => {
// 	console.log('voiceLeave');
// });

// discordbot.on('voiceStateUpdate', (err) => {
// 	console.log('voiceStateUpdate');
// });