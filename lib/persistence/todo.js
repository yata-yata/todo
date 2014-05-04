// Load modules
var mongoose = require('mongoose');

// Declare internals
var internals = {};

mongoose.connect(process.env.mongouri);

internals.model = mongoose.model('Todo', {
  title: String,
  status: String
});

module.exports = function(){};

module.exports.prototype.all = function(callback){
  internals.model.find(callback);
};

module.exports.prototype.get = function(id, callback){
  internals.model.findOne({ _id: id }, callback);
};

module.exports.prototype.create = function(model, callback){
  internals.model.create(model, callback);
};

module.exports.prototype.update = function(id, model, callback){
  internals.model.update({ _id: id}, model, callback);
};

module.exports.prototype.destroy = function(id, callback){
  internals.model.remove({ _id: id}, callback);
};

