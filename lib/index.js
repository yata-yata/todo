// Load modules

var Controllers = require('./controllers'),
    Services = require('./services'),

    // Declare internals
    internals = {};

exports.register = function(plugin, options, next){

    plugin.bind({
        services: new Services(options)
    });

    plugin.select('api').route([
        { method: 'GET', path: '/todos' , config: Controllers.Todos.getAll },
        { method: 'GET', path: '/todos/{id}' , config: Controllers.Todos.getById },
        { method: 'POST', path: '/todos' , config: Controllers.Todos.create },
        { method: 'PUT', path: '/todos/{id}' , config: Controllers.Todos.update },
        { method: 'DELETE', path: '/todos/{id}' , config: Controllers.Todos.destroy }
    ]);

    next();
};
