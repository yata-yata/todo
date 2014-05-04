// Load modules

var Controllers = require('./controllers'),
    Services = require('./services');

// Declare internals

var internals = {};

exports.register = function(plugin, options, next){

    plugin.bind({
        services: new Services(options)
    });

    plugin.select('api').route([
        { method: 'GET', path: '/todo' , config: Controllers.Todos.getAll },
        { method: 'GET', path: '/todo/{id}' , config: Controllers.Todos.getById },
        { method: 'POST', path: '/todo' , config: Controllers.Todos.create },
        { method: 'PUT', path: '/todo/{id}' , config: Controllers.Todos.update },
        { method: 'DELETE', path: '/todo/{id}' , config: Controllers.Todos.destroy }
    ]);

    next();
};
