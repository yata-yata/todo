var Todo = require('../persistence/todo');

module.exports = function(){
};

module.exports.prototype.retrieve = function(options, callback){
  Todo.find(callback);
};

module.exports.prototype.create = function(model, callback){
  Todo.create(model, callback);
};
