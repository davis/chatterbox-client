// make linter happy
var $ = $;
var _ = _;
var moment = moment;
// end

// YOUR CODE HERE:
var app = {

  init: function() {
    this.activeChatRoom;
    this.allMessages = [];
    this.chatRooms = {};
    this.friends = {};
    this.lastRefresh = 0;
    this.server = 'something';

    this.fetch();
  },

  fetch: function() {
    $.ajax({
      url: 'https://api.parse.com/1/classes/chatterbox',
      data: {
        order: '-createdAt'
      },
      success: function (data) {
        console.log('chatterbox: Successfully fetched messages');
        for(var i = data.results.length-1; i >= 0; i--){
          var m = data.results[i];
          var date = new Date(m.createdAt);
          if (date > app.lastRefresh){
            app.allMessages.push(m);
            app.chatRooms[m.roomname] = true;
          }
        }
        app.render(app.allMessages);
        app.renderChatRooms();
        app.lastRefresh = Date.now();
      },
      error: function (data) {
        console.error('chatterbox: Failed to fetch messages');
      }
    });
  },

  render: function(data) {
    data = data || app.allMessages;
    $('.messages').html('');
    for(var i = 0; i < data.length; i++){
      var m = data[i];
      if (m.roomname === app.activeChatRoom || app.activeChatRoom === undefined) {
        var isFriend = app.friends[m.username];
        $('.messages').prepend(app.template(m, isFriend));
      }
    }
  },

  renderChatRooms: function() {
    $('#chatroomlist').html('');
    for(var chatroom in app.chatRooms) {
      var $chatroom = $('<li><a href="#" class="chatroom">' + chatroom + '</a></li>');
      $('#chatroomlist').append($chatroom);
    }
  },

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
      },
      complete: function (data) {
        console.log('complete');
      },
      error: function (data) {
        // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message');
      }
    });
  },

  template: function(m, isFriend) {
    if(isFriend) {
      var $message = $('<div class="bold"></div>');
    } else {
      var $message = $('<div class="message"></div>');
    }
    var $user = $('<a href ="#" class="username"></a>');
    $user.text(m.username);
    var date = moment(m.createdAt).fromNow();
    $message.text(': ' + m.text + '(' + date + ')' + ' in ' + m.roomname);
    return $message.prepend($user);
  }
};


app.init();
