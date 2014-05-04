// Load modules
var Todo = require('../persistence/todo');

// Declare internals
var internals = {};

internals.todo = new Todo();

module.exports = function(){};

module.exports.prototype.retrieve = function(options, callback){
  if(options){
    if(options.id){
      internals.todo.get(options.id, callback);
    } else {
      throw new Error('Not Implemented');
    }
  } else {
    internals.todo.all(callback);
  }
};

module.exports.prototype.create = function(model, callback){
  internals.todo.create(model, callback);
};

module.exports.prototype.update = function(options, callback){
  internals.todo.update({ _id: options.id}, options.model, callback);
};

module.exports.prototype.destroy = function(options, callback){
  internals.todo.remove({ _id: options.id}, callback);
};
