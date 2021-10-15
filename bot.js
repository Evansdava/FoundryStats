require('dotenv').config();
const Discord = require('discord.js');
const bot = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"]});
const TOKEN = process.env.TOKEN;

bot.login(TOKEN);

// Show when bot is initialized
bot.on('ready', () => {
    console.info(`Logged in as ${bot.user.tag}!`);
});

// Grab roll and user from incoming bot messages
bot.on('message', msg => {
    if (msg.embeds.length > 0 && msg.author.bot == true) {
        // console.log(msg.author.username)
        // console.log(msg.embeds[0].description)
        let roll = msg.embeds[0].description.split('= ')[1]
        // console.log(roll)
        let user = msg.author.username
        io.emit('new roll', roll, user)
    }
});