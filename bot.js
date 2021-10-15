require('dotenv').config();
const Discord = require('discord.js');
const bot = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"]});
const TOKEN = process.env.TOKEN;

module.exports = (io) => {
    bot.login(TOKEN);

    bot.on('ready', () => {
        console.info(`Logged in as ${bot.user.tag}!`);
    });

    bot.on('message', msg => {
        if (msg.embeds.length > 0) {
            console.log(msg.author.username)
            console.log(msg.embeds[0].description)
            let roll = msg.embeds[0].description.split('= ')[1]
            console.log(roll)
            let user = msg.author.username
            io.emit('new roll', roll, user)
        } else {
            console.log(msg.content)
        }
    });
}