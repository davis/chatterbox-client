// YOUR CODE HERE:


var app = {
  init : function() {
    this.server = 'something'
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
      error: function (data) {
        // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message');
      }
    });
  },
  fetch: function() {
    $.ajax({
      url: 'https://api.parse.com/1/classes/chatterbox',
      success: function (data) {
        console.log('chatterbox: Successfully fetched messages');
        app.render(data);
      },
      error: function (data) {
        console.error('chatterbox: Failed to fetch messages');
      }
    });
  },
  render: function(data) {
    console.log(data);
    _.each(data.results, function(messageObj) {
      $('body').append(app.template(messageObj.username, messageObj.text));
    });
  },

  template: function(username, text) {
    return '<div>' + username + ': ' + text + '</div>';
  }
};
