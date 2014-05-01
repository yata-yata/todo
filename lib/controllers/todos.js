// Load modules
var Joi = require('joi'),
    Hoek = require('hoek'),
    Boom = require('boom');

// Declare internals

var internals = {};

exports.create = {
    description: 'Creates new Todo',
    validate: {
        payload: {
            status: Joi
                .string()
                .optional()
                .valid(['done', 'in progress', 'not started'])
                .default('not started')
                .description('Status'),
            title: Joi
                .string()
                .required()
                .description('Title')
        }
    },
    handler: function(request, reply){
        this.services.todos.create({}, function(err, response){
            reply(response);
        });
    }
};

exports.get = {
    handler: function(request, reply){
        this.services.todos.retrieve({}, function(err, response){
            reply(response);
        });
    }
};
