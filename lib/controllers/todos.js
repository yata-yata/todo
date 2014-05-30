// Load modules
var Joi = require('joi'),
    Hoek = require('hoek'),
    Boom = require('boom'),

// Declare internals
internals = {};


exports.getAll = {
    auth: 'api',
    handler: function(request, reply){
        this.services.todos.get({
            user: request.params.user
        }, function(err, response){

            if(err) reply().code(500);
            else reply(response);

        });
    }
};

exports.getById = {
    auth: 'api',
    handler: function(request, reply){
        this.services.todos.get({
            user: request.params.user,
            id: request.params.id
        }, function(err, response){

            if(err) reply().code(500);
            else if(!response) reply().code(404);
            else reply(response);

        });
    }
};

exports.create = {
    auth: 'api',
    description: 'Creates new Todo',
    validate: {
        payload: {
            status: Joi
            .string()
            .optional()
            .valid(['done', 'not started'])
            .default('not started')
            .description('Status'),
            title: Joi
            .string()
            .required()
            .description('Title')
        }
    },
    handler: function(request, reply){
        this.services.todos.create({
            user: request.params.user,
            model: request.payload
        }, function(err, response){

            if(err) reply().code(500);
            else reply(request.payload).code(201).header('Location',  '/todos/' + response);
        });
    }
};

exports.update = {
    auth: 'api',
    validate: {
        payload: {
            status: Joi
            .string()
            .required()
            .valid(['done', 'not started'])
            .default('not started')
            .description('Status'),
            title: Joi
            .string()
            .required()
            .description('Title')
        }
    },
    handler: function(request, reply){
        this.services.todos.update({
            id: request.params.id,
            user: request.params.user,
            model: request.payload
        }, function(err, response){

            if(err) reply().code(500);
            else reply(response);

        });
    }
};

exports.destroy = {
    auth: 'api',
    handler: function(request, reply){
        this.services.todos.destroy({
            user: request.params.user,
            id: request.params.id
        }, function(err, response){

            if(err) reply().code(500);
            else reply(response).code(204);

        });
    }
};
