// Load modules

var Controllers = require('./controllers'),
    Services = require('./services'),

    // Declare internals
    internals = {};

exports.register = function(plugin, options, next){

    plugin.bind({
        services: new Services(options)
    });

    plugin.route([
        { method: 'GET', path: '/users/{user}/todos', config: Controllers.Todos.getAll },
        { method: 'GET', path: '/users/{user}/todos/{id}', config: Controllers.Todos.getById },
        { method: 'POST', path: '/users/{user}/todos', config: Controllers.Todos.create },
        { method: 'PUT', path: '/users/{user}/todos/{id}', config: Controllers.Todos.update },
        { method: 'DELETE', path: '/users/{user}/todos/{id}', config: Controllers.Todos.destroy }
    ]);

    next();
};

exports.register.attributes = {
    pkg: require('../package.json')
};
