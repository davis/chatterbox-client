var _ = _;
var moment = moment;

var Message = function(text, createdAt, objectId, username, chatroom) {
  this._text = text;
  this._createdAt = createdAt;
  this._objectId = objectId;
  this._username = username;
  this._chatroom = chatroom;
  this._timeAsString = this.timeToString();
};

Message.prototype.hello = function(){
  alert('hi');
};

Message.prototype.timeToString = function() {
  return moment(this._createdAt).fromNow();
};

Message.prototype.templated = _.template('<div class="message"> \
                                            <div class="message-header"> \
                                              <a class="username" href="#"><%- this._username %></a><small class="created-at"><%- this._timeAsString %></small> \
                                            </div> \
                                            <p class="message-text"><%- this._text %></p> \
                                          </div>');

