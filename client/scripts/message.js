var Message = function(text, createdAt, objectId) {
  this._text = text;
  this._createdAt = createdAt;
  this._objectId = objectId;
};

Message.prototype.hello = function(){};
