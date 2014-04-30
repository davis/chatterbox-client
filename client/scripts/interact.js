// make linter happy
var $ = $;
var app = app;
// end

// interact with messageList

$(function(){
  // Toggle friendship of a user when username is clicked.
  $('body').on('click', '.username', function(event) {
    event.preventDefault();
    app.allUsers[$(this).text()] = !app.allUsers[$(this).text()];
    app.renderRoom();
  });

  setInterval(function() {
    app.fetch();
  }, 2000);

});
