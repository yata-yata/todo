// Load modules

var Controllers = require('./controllers');


// Declare internals

var internals = {};

exports.register = function(plugin, options, next){
    plugin.select('api').route([
        { method: 'POST', path: '/todo' , config: Controllers.Todo.create }
    ]);
};
