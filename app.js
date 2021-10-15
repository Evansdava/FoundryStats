const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const ss = require('simple-statistics')

app.use(express.static('static'));

// Activate Bot
require('dotenv').config();
const Discord = require('discord.js');
const bot = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"]});
const TOKEN = process.env.TOKEN;

// Declare variables
let rolls = []
let mean = 0
let median = 0
let mode = 0
let max = 0
let min = 0
let total = 0

let onlineUsers = {}

bot.login(TOKEN);

// Show when bot is initialized
bot.on('ready', () => {
    console.info(`Logged in as ${bot.user.tag}!`);
});

// Grab roll and user from incoming bot messages
bot.on('message', msg => {
    if (msg.embeds.length > 0 && msg.author.bot == true) {
        let roll = msg.embeds[0].description.split('= ')[1]
        let user = msg.author.username

        // Update statistics with each roll
        updateStats(roll)
        io.emit('new roll', roll, user)
    }
});


// Main websocket handlers
io.on("connection", (socket) => {
    console.log("User has connected");

    // Send updated stats to the client
    socket.on('update stats', () => {
        io.emit('update stats', mean, median, mode, max, min, total)
    })

    // Save new user to app
    socket.on('new user', (username) => {
        //Save the username as key to access the user's socket id
        onlineUsers[username] = socket.id;
        //Save the username to socket as well
        socket["username"] = username;
        console.log(`${username} has joined the game!`);
        io.emit("new user", username);
    })

    // Handle users disconnecting
    socket.on('disconnect', () => {
        // This deletes the user by using the username we saved to the socket
        console.log(`${socket.username} has disconnected`);
        delete onlineUsers[socket.username]
        io.emit('user has left', onlineUsers);
    });

    // Send new message to everyone in chat
    socket.on('new message', (data) => {
        io.emit('new message', data);
    });
});

// Update statistics
function updateStats(roll) {
    roll = parseInt(roll)
    // console.log("Before:", rolls)

    mean = ss.addToMean(mean, rolls.length, roll);
    // console.log("Mean: ", mean)

    rolls.push(roll)

    median = ss.median(rolls)
    // console.log("Median: ", median)

    mode = ss.mode(rolls)
    // console.log("Mode: ", mode)

    max = ss.max(rolls)
    // console.log("Max: ", max)

    min = ss.min(rolls)
    // console.log("Min: ", min)

    // console.log("After", rolls)
    total = rolls.length
}

// Render homepage
app.get('/', (req, res) => {
    res.render('static/index.html');
})
  
// Run on port 3000
server.listen('3000', () => {
    console.log('Server listening on Port 3000');
})