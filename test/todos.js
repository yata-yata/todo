// Load modules
var Lab = require('lab'),
    Hapi = require('hapi'),
    Todos = require('../lib/services/todos'),

    // Declare internals
    internals = {},

    // Test aliases
    expect = Lab.expect,
    before = Lab.before,
    beforeEach = Lab.beforeEach,
    after = Lab.after,
    afterEach = Lab.afterEach,
    describe = Lab.experiment,
    it = Lab.test,
    assert = Lab.assert;

internals.prepareServer = function(callback){
  var server = new Hapi.Server({ labels: ['api'] });
  server.pack.require('../', {}, function(err){
    expect(err).to.not.exist;
    callback(server);
  });
};

describe('Todos', function(){

  describe('GET', function(){
    var orig;

    beforeEach(function(done){
      orig = Todos.prototype.get;
      done();
    });

    afterEach(function(done){
      Todos.prototype.get = orig;
      done();
    });

    it('should return an array of todos if no ID is passed', function(done){

      // Given
      Todos.prototype.get = function(options, callback){
        callback(null, [1,2,3]);
      };

      internals.prepareServer(function(server){

        // When
        server.inject({ method: 'GET', url: '/todos' }, function(response){

          // Then
          expect(response.result).to.be.instanceof(Array);

          done();
        });
      });
    });

    it('should return a todo object if an id is passed', function(done){

      // Given
      Todos.prototype.get = function(options, callback){
        callback(null, {
          title: 'todo'
        });
      };

      internals.prepareServer(function(server){

        // When
        server.inject({ method: 'GET', url: '/todos/123' }, function(response){

          // Then
          expect(response.result).to.be.an('object');
          expect(response.result).to.not.be.instanceOf(Array);

          done();
        });
      });
    });

    it('should return a 404 if an id is passed, but no object is found', function(done){

      // Given
      Todos.prototype.get = function(options, callback){
        callback(null, null);
      };

      internals.prepareServer(function(server){

        // When
        server.inject({ method: 'GET', url: '/todos/123' }, function(response){

          // Then
          expect(response.statusCode).to.equal(404);

          done();
        });
      });
    });

    it('should fail', function(done){
      expect(true).to.equal(false);
      done();
    });
  });
});
