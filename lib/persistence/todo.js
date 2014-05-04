var mongoose = require('mongoose');

mongoose.connect(process.env.mongouri);

module.exports = mongoose.model('Todo', {
  title: String,
  status: String
});
