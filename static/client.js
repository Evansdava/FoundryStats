$(document).ready(() => {

    const socket = io();
    let currentUser;

    // When create user button is clicked, log in with entered username
    $('#create-user-btn').click((e)=>{
        e.preventDefault();
        if($('#username-input').val().length > 0){
          socket.emit('new user', $('#username-input').val());
          // Save the current user when created
          currentUser = $('#username-input').val();
          $('.Username-form').remove();
          $('.chat-box').css('display', 'flex');
        }
    });

    $('#send-chat-btn').click((e) => {
        e.preventDefault();
        // Get the message text value
        let message = $('#chat-input').val();
        // Make sure it's not empty
        if(message.length > 0){
            // Emit the message with the current user to the server
            socket.emit('new message', {
            sender : currentUser,
            message : message,
            });
            $('#chat-input').val("");
        }
    });

    //socket listeners
    socket.on('new user', (username) => {
        console.log(`${username} has joined the chat`);
        // $('.users-online').append(`<div class="user-online">${username}</div>`);
    })

    //Output the new message
    socket.on('new message', (data) => {
        $('.message-container').append(`
        <div class="message">
            <p class="message-user">${data.sender}: </p>
            <p class="message-text">${data.message}</p>
        </div>
        `);
    })

    socket.on('update stats', (mean, median, mode, max, min) => {
        $('.stats #mean').text(mean)
        $('.stats #median').text(median)
        $('.stats #mode').text(mode)
        $('.stats #max').text(max)
        $('.stats #min').text(min)
    });

    socket.on('new roll', (roll) => {
        // $('.main-container').append(`<p>${roll}</p>`)
        socket.emit('update stats', roll)
    })
})
