// Load modules
var mongoose = require('mongoose'),

    // Declare internals
    internals = {},
    model;

module.exports = function(){

  mongoose.connect(process.env.mongouri);

  this.model = mongoose.model('Todo', {
    title: String,
    status: String
  });

};

module.exports.prototype.all = function(callback){
  this.model.find(callback);
};

module.exports.prototype.get = function(id, callback){
  this.model.findById(id, callback);
};

module.exports.prototype.create = function(model, callback){
  this.model.create(model, callback);
};

module.exports.prototype.update = function(id, model, callback){
  this.model.update({ _id: id}, model, callback);
};

module.exports.prototype.destroy = function(id, callback){
  this.model.remove({ _id: id}, callback);
};

