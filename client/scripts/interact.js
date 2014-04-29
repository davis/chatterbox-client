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
      roomname: 'lobby'
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

  setInterval(function() {
    app.fetch();
  }, 2000);



});
