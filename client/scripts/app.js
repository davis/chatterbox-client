// make linter happy
var $ = $;
var _ = _;
var moment = moment;
// end

// YOUR CODE HERE:


var app = {
  init : function() {
    this.server = 'something';
  },

  lastRefresh: 0,

  send: function(message) {
    message = message || {
      'username': 'davis',
      'text': 'hats on cats',
      'roomname': 'lobby'
    };

    $.ajax({
      // always use this url
      url: 'https://api.parse.com/1/classes/chatterbox',
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent');
        console.dir(data);
        console.log(JSON.stringify(message));
      },
      complete: function (data) {
        console.log('complete')
      },
      error: function (data) {
        // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message');
      }
    });
  },
  fetch: function() {
    $.ajax({
      url: 'https://api.parse.com/1/classes/chatterbox?order=-createdAt',
      success: function (data) {
        console.log('chatterbox: Successfully fetched messages');
        console.log(data);
        app.render(data);
        app.lastRefresh = Date.now();
      },
      error: function (data) {
        console.error('chatterbox: Failed to fetch messages');
      }
    });
  },

  render: function(data) {
    for(var i = data.results.length-1; i >= 0; i--){
      var m = data.results[i];
      var date = new Date(m.createdAt);
      if (date > app.lastRefresh){
        console.log(m.username, m.text);
        $('.messages').prepend(app.template(m));
      }
    }
  },

  template: function(m) {
    var $message = $('<div class="message"></div>');
    var date = moment(m.createdAt).fromNow();
    $message.text('(' + date + ')' + m.username + ': ' + m.text + ' (' + m.objectId + ')');
    return $message;
  }
};
