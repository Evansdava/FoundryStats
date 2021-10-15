const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(express.static('static'));

// Activate Bot
bot = require('./bot.js')(io)

io.on("connection", (socket) => {
    console.log("User has connected");

    // // Save new user to app
    // socket.on('new user', (username) => {
    //     //Save the username as key to access the user's socket id
    //     onlineUsers[username] = socket.id;
    //     //Save the username to socket as well
    //     socket["username"] = username;
    //     console.log(`${username} has joined the game!`);
    //     io.emit("new user", username);
    // })

    // // Handle users disconnecting
    // socket.on('disconnect', () => {
    //     // This deletes the user by using the username we saved to the socket
    //     console.log(`${socket.username} has disconnected`);
    //     delete onlineUsers[socket.username]
    //     io.emit('user has left', onlineUsers);
    // });
});

// Render homepage
app.get('/', (req, res) => {
    res.render('static/index.html');
})
  
// Run on port 3000
server.listen('3000', () => {
    console.log('Server listening on Port 3000');
})