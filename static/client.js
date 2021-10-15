$(document).ready(() => {

    const socket = io();
    let currentUser;
    // Get stats on first login
    socket.emit('update stats')

    // When create user button is clicked, log in with entered username
    $('#create-user-btn').click((e)=>{
        e.preventDefault();
        if($('#username-input').val().length > 0){
          socket.emit('new user', $('#username-input').val());
          // Save the current user when created
          currentUser = $('#username-input').val();
          $('#username-form').remove();
          $('#chat-box').css('display', 'flex');
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
            <p class="message-user">${data.sender}: ${data.message}</p>
        </div>
        `);
        $('.message-container').scrollTop($('.message-container').get(0).scrollHeight);
    })

    // Update statistics on the page
    socket.on('update stats', (mean, median, mode, max, min, total) => {
        $('.stats #mean').text(mean)
        $('.stats #median').text(median)
        $('.stats #mode').text(mode)
        $('.stats #max').text(max)
        $('.stats #min').text(min)
        $('.stats #total').text(total)
    });

    // Get new stats and display new rolls
    socket.on('new roll', (roll, user) => {
        socket.emit('update stats')
        $('.rolls-container').append(`<p>${user} rolled ${roll}</p>`)
        $('.message-container').scrollTop($('.message-container').get(0).scrollHeight);
    })
})
