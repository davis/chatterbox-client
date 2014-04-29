var Chatroom = function(chatroomName) {
  this._chatroomName = chatroomName;
  this._isActive = false;
  this._messages = [];
};

Chatroom.prototype.makeActive = function() {
  this._isActive = !this._isActive;
};

Chatroom.prototype.addMessage = function(Message) {
  this._messages.push(Message);
};
