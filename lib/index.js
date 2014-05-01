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
        { method: 'POST', path: '/todo' , config: Controllers.Todos.create },
        { method: 'GET', path: '/todo' , config: Controllers.Todos.get }
    ]);

    next();
};
