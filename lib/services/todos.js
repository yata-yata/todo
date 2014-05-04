var Todo = require('../persistence/todo');

module.exports = function(){
};

module.exports.prototype.retrieve = function(options, callback){
  if(options){
    Todo.findOne({ _id: options.id}, callback);
  } else {
    Todo.find(callback);
  }
};

module.exports.prototype.create = function(model, callback){
  Todo.create(model, callback);
};

module.exports.prototype.update = function(options, callback){
  Todo.update({ _id: options.id}, options.model, callback);
};

module.exports.prototype.destroy = function(options, callback){
  Todo.remove({ _id: options.id}, callback);
};
