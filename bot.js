



// hydrabolt's implemenation of discord.js
var Discord = require("discord.js");
// Email and Password of discordbot
var Login = require("./auth.json");
var discordbot = new Discord.Client();

discordbot.on("message", function(message){
    if(message.content === "ping")
        discordbot.reply(message, "pong");
});

discordbot.login(Login.email, Login.password);
