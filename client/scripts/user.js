var User = function(username) {
  this._username = username;
  this._isFriend = false;
  this._messages = [];
};

User.prototype.changeFriendStatus = function() {
  this._isFriend = !this._isFriend;
};

User.prototype.addMessage = function(Message) {
  this._messages.push(Message);
};

User.prototype.getMessages = function() {
  return this._messages;
};
