// make linter happy
var $ = $;
var app = app;

// end


$(document).ready(function() {
  var send = function() {
    var $text = $('.composeMessage').val();
    var username = window.location.search.split('username=')[1].split('&')[0];
    var message = {
      username: username,
      text: $text,
      roomname: app.activeChatRoom || 'lobby'
    };
    app.send(message);
    $('.composeMessage').val('');
  };

  $('.fetch').click(function() {
    app.fetch();
  });

  $('.sendMessage').click(function() {
    send();
  });

  $('.composeMessage').keyup(function(e) {
    if (e.which === 13) {
      send();
    }
  });

  $('body').on('click', '.username', function() {
    var newFriend = $(this).text();
    if (!app.friends[newFriend]) { // if friend is not in friends array
      app.friends[newFriend] = true;
      app.render();
    }
  });

  $('body').on('click', '.chatroom', function() {
    app.activeChatRoom = $(this).text();
    $(this).addClass('bold');
    app.render();
  });

  $('.title').click(function(){
    app.activeChatRoom = undefined;
    app.render();
    app.renderChatRoom();
  });

  setInterval(function() {
    app.fetch();
  }, 2000);



});
