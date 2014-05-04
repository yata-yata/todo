// Load modules
var Joi = require('joi'),
    Hoek = require('hoek'),
    Boom = require('boom');

// Declare internals

var internals = {};


exports.getAll = {
    handler: function(request, reply){
        this.services.todos.retrieve(null, function(err, response){
            reply(response);
        });
    }
};

exports.getById = {
  handler: function(request, reply){
    this.services.todos.retrieve({
        id: request.params.id
      }, function(err, response){
        reply(response);
    });
  }
};

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
        this.services.todos.create(request.payload, function(err, response){
            reply(response);
        });
    }
};

exports.update = {
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
        .optional()
        .description('Title')
    }
  },
  handler: function(request, reply){
    this.services.todos.update({
        id: request.params.id,
        model: request.payload
      }, function(err, response){
          reply(response);
    });
  }
};

exports.destroy = {
  handler: function(request, reply){
    this.services.todos.destroy({
        id: request.params.id
      }, function(err, response){
          reply(response);
    });
  }
};
