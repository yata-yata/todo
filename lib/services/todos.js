// Load modules
var Todos = require('../persistence/todos'),

    // Declare internals
    internals = {};

module.exports = function(){};

module.exports.prototype.get = function(options, callback){
  var todos = new Todos();

  if(options){
    if(options.id){
      todos.get(options.id, callback);
    }
  } else {
    todos.all(callback);
  }
};

module.exports.prototype.create = function(model, callback){
  var todos = new Todos();

  todos.create(model, callback);
};

module.exports.prototype.update = function(options, callback){
  var todos = new Todos();

  todos.update(options.id, options.model, callback);
};

module.exports.prototype.destroy = function(options, callback){
  var todos = new Todos();

  todos.destroy(options.id, callback);
};
