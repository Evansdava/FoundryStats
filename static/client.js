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

    socket.on('new roll', (roll) => {
        $('.main-container').append(`<p>${roll}</p>`)
    })
})
