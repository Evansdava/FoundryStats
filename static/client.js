$(document).ready(() => {

    const socket = io();
    let currentUser;

    // When create user button is clicked, log in with entered username
    // $('#create-user-btn').click((e)=>{
    //     e.preventDefault();
    //     if($('#username-input').val().length > 0){
    //       socket.emit('new user', $('#username-input').val());
    //       // Save the current user when created
    //       currentUser = $('#username-input').val();
    //       $('.Username-form').remove();
    //       $('.main-container').css('display', 'flex');
    //     }
    // });

    // Update leaderboard when a user leaves
    // socket.on('user has left', () => {
        
    // })

    socket.on('update stats', (mean, median, mode, max, min) => {
        $('.stats #mean').text(mean)
        $('.stats #median').text(median)
        $('.stats #mode').text(mode)
        $('.stats #max').text(max)
        $('.stats #min').text(min)
    })

    socket.on('new roll', (roll) => {
        // $('.main-container').append(`<p>${roll}</p>`)
        socket.emit('update stats', roll)
    })
})
