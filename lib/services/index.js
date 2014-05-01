var Todos = require('./todos');

module.exports = function(options){
    this.todos = new Todos();
};
