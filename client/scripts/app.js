// make linter happy
var $ = $;
var _ = _;
var moment = moment;
// end

// YOUR CODE HERE:
var app = {

  // initializes messages, chatrooms, and users to blank arrays/objects
  init: function() {
    this.allMessages = {};
    this.allChatRooms = {};
    this.allUsers = {};
  },

  // fetch should pull last 100 msgs from server
  fetch: function() {
    $.ajax({
      url: 'https://api.parse.com/1/classes/chatterbox',
      data: {
        order: '-createdAt'
      },
      success: function (data) {
        console.log('chatterbox: Successfully fetched messages');
        app.organize.call(app, data.results);
      },
      error: function (data) {
        console.error('chatterbox: Failed to fetch messages');
      }
    });
  },

  // organize takes the messages array fetch returns and loads it into the users and chatrooms
  organize: function(messages) {
    // for each msg
    for(var i = 0; i < messages.length; i++) {
      var m = messages[i];
      // check if obj id is in all messages
      if(!this.allMessages[m.objectId]) {
        // if we don't have the user, create new user
        if(!this.allUsers[m.username]) {
          this.allUsers[m.username] = 1;
        } else {
          this.allUsers[m.username]++;
        }
        // if we don't have the chatroom, create new chatroom
        if(!this.allChatRooms[m.roomname]) {
          this.allChatRooms[m.roomname] = 1;
        } else {
          this.allChatRooms[m.roomname]++;
        }
        // push to both user and chatroom
        var message = new Message(m.text, m.createdAt, m.objectId, m.username, m.roomname);
        this.allMessages[m.objectId] = true;
        app.render(message);
      }
    }
  },

  render: function(message) {
    $('.message-list').prepend($(message.templated()));
  },

  renderChatRooms: function() {
    $('#chatroomlist').html('');
    for(var chatroom in app.chatRooms) {
      var $chatroom = $('<li><a href="#" class="chatroom">' + chatroom + '</a></li>');
      $('#chatroomlist').append($chatroom);
    }
  },

  send: function(message) {
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
