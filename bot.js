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
            console.log(msg.embeds[0].description)
            roll = msg.embeds[0].description.split('= ')[1]
            console.log(roll)
            io.emit('new roll', roll)
        } else {
            console.log(msg.content)
        }
    });
}