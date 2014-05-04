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

    it('should return a 500 if an error is returned when trying to access by id', function(done){

      // Given
      Todos.prototype.get = function(options, callback){
        callback(new Error('Error'));
      };

      internals.prepareServer(function(server){

        // When
        server.inject({ method: 'GET', url: '/todos/123' }, function(response){

          // Then
          expect(response.statusCode).to.equal(500);

          done();
        });
      });
    });

    it('should return a 500 if an error is returned when trying to access all', function(done){

      // Given
      Todos.prototype.get = function(options, callback){
        callback(new Error('Error'));
      };

      internals.prepareServer(function(server){

        // When
        server.inject({ method: 'GET', url: '/todos' }, function(response){

          // Then
          expect(response.statusCode).to.equal(500);

          done();
        });
      });
    });

  });

  describe('POST', function(){
    var orig;

    beforeEach(function(done){
      orig = Todos.prototype.create;
      done();
    });

    afterEach(function(done){
      Todos.prototype.create = orig;
      done();
    });

    it('should require a title', function(done){

      // Given
      Todos.prototype.create = function(options, callback){
        callback(null, 123);
      };

      internals.prepareServer(function(server){

        // When
        server.inject({
          method: 'POST',
          url: '/todos',
          payload: JSON.stringify({
          })
        }, function(response){

          // Then
          expect(response.statusCode).to.equal(400);

          done();
        });
      });
    });

    it('should accept a valid status of `done`', function(done){

      // Given
      Todos.prototype.create = function(options, callback){
        callback(null, 123);
      };

      internals.prepareServer(function(server){

        // When
        server.inject({
          method: 'POST',
          url: '/todos',
          payload: JSON.stringify({
            title: 'Test',
            status: 'done'
          })
        }, function(response){

          // Then
          expect(response.statusCode).to.equal(201);

          done();
        });
      });
    });

    it('should accept a valid status of `in progress`', function(done){

      // Given
      Todos.prototype.create = function(options, callback){
        callback(null, 123);
      };

      internals.prepareServer(function(server){

        // When
        server.inject({
          method: 'POST',
          url: '/todos',
          payload: JSON.stringify({
            title: 'Test',
            status: 'in progress'
          })
        }, function(response){

          // Then
          expect(response.statusCode).to.equal(201);

          done();
        });
      });
    });

    it('should accept a valid status of `not started`', function(done){

      // Given
      Todos.prototype.create = function(options, callback){
        callback(null, 123);
      };

      internals.prepareServer(function(server){

        // When
        server.inject({
          method: 'POST',
          url: '/todos',
          payload: JSON.stringify({
            title: 'Test',
            status: 'not started'
          })
        }, function(response){

          // Then
          expect(response.statusCode).to.equal(201);

          done();
        });
      });
    });

    it('should reject an invalid status', function(done){

      // Given
      Todos.prototype.create = function(options, callback){
        callback(null, 123);
      };

      internals.prepareServer(function(server){

        // When
        server.inject({
          method: 'POST',
          url: '/todos',
          payload: JSON.stringify({
            title: 'Test',
            status: 'blah'
          })
        }, function(response){

          // Then
          expect(response.statusCode).to.equal(400);

          done();
        });
      });
    });


    it('should default to status to `not started` if no status is given', function(done){

      // Given
      Todos.prototype.create = function(options, callback){
        callback(null, 123);
      };

      internals.prepareServer(function(server){

        // When
        server.inject({
          method: 'POST',
          url: '/todos',
          payload: JSON.stringify({
            title: 'Test'
          })
        }, function(response){

          // Then
          expect(response.result.status).to.equal('not started');

          done();
        });
      });
    });

    it('should return a 201 status code if successful', function(done){

      // Given
      Todos.prototype.create = function(options, callback){
        callback(null, 123);
      };

      internals.prepareServer(function(server){

        // When
        server.inject({
          method: 'POST',
          url: '/todos',
          payload: JSON.stringify({
            title: 'Test'
          })
        }, function(response){

          // Then
          expect(response.statusCode).to.equal(201);

          done();
        });
      });
    });

    it('should return a location header of `/todos/{id}` if successful', function(done){

      // Given
      Todos.prototype.create = function(options, callback){
        callback(null, 123);
      };

      internals.prepareServer(function(server){

        // When
        server.inject({
          method: 'POST',
          url: '/todos',
          payload: JSON.stringify({
            title: 'Test'
          })
        }, function(response){

          // Then
          expect(response.headers.location).to.equal('/todos/123');

          done();
        });
      });
    });

    it('should return a 500 if an error occurs', function(done){

      // Given
      Todos.prototype.create = function(options, callback){
        callback(new Error('Error'));
      };

      internals.prepareServer(function(server){

        // When
        server.inject({
          method: 'POST',
          url: '/todos',
          payload: JSON.stringify({
            title: 'Test'
          })
        }, function(response){

          // Then
          expect(response.statusCode).to.equal(500);

          done();
        });
      });
    });

  });

  describe('PUT', function(){
    var orig;

    beforeEach(function(done){
      orig = Todos.prototype.update;
      done();
    });

    afterEach(function(done){
      Todos.prototype.update = orig;
      done();
    });

    it('should return a 500 if an error occurs', function(done){

      // Given
      Todos.prototype.update = function(options, callback){
        callback(new Error('Error'));
      };

      internals.prepareServer(function(server){

        // When
        server.inject({
          method: 'PUT',
          url: '/todos/123',
          payload: JSON.stringify({
            title: 'Test',
            status: 'not started'
          })
        }, function(response){

          // Then
          expect(response.statusCode).to.equal(500);

          done();
        });
      });
    });

    it('should require a title', function(done){

      // Given
      Todos.prototype.update = function(options, callback){
        callback(null, 123);
      };

      internals.prepareServer(function(server){

        // When
        server.inject({
          method: 'PUT',
          url: '/todos/123',
          payload: JSON.stringify({
          })
        }, function(response){

          // Then
          expect(response.statusCode).to.equal(400);

          done();
        });
      });
    });


    it('should require a status', function(done){

      // Given
      Todos.prototype.update = function(options, callback){
        callback(null, 123);
      };

      internals.prepareServer(function(server){

        // When
        server.inject({
          method: 'PUT',
          url: '/todos/123',
          payload: JSON.stringify({
          })
        }, function(response){

          // Then
          expect(response.statusCode).to.equal(400);

          done();
        });
      });
    });

    it('should accept a valid status of `done`', function(done){

      // Given
      Todos.prototype.update = function(options, callback){
        callback(null, 123);
      };

      internals.prepareServer(function(server){

        // When
        server.inject({
          method: 'PUT',
          url: '/todos/123',
          payload: JSON.stringify({
            title: 'Test',
            status: 'done'
          })
        }, function(response){

          // Then
          expect(response.statusCode).to.equal(200);

          done();
        });
      });
    });

    it('should accept a valid status of `in progress`', function(done){

      // Given
      Todos.prototype.update = function(options, callback){
        callback(null, 123);
      };

      internals.prepareServer(function(server){

        // When
        server.inject({
          method: 'PUT',
          url: '/todos/123',
          payload: JSON.stringify({
            title: 'Test',
            status: 'in progress'
          })
        }, function(response){

          // Then
          expect(response.statusCode).to.equal(200);

          done();
        });
      });
    });

    it('should accept a valid status of `not started`', function(done){

      // Given
      Todos.prototype.update = function(options, callback){
        callback(null, 123);
      };

      internals.prepareServer(function(server){

        // When
        server.inject({
          method: 'PUT',
          url: '/todos/123',
          payload: JSON.stringify({
            title: 'Test',
            status: 'not started'
          })
        }, function(response){

          // Then
          expect(response.statusCode).to.equal(200);

          done();
        });
      });
    });

    it('should reject an invalid status', function(done){

      // Given
      Todos.prototype.update = function(options, callback){
        callback(null, 123);
      };

      internals.prepareServer(function(server){

        // When
        server.inject({
          method: 'PUT',
          url: '/todos/123',
          payload: JSON.stringify({
            title: 'Test',
            status: 'blah'
          })
        }, function(response){

          // Then
          expect(response.statusCode).to.equal(400);

          done();
        });
      });
    });

  });

  describe('DELETE', function(){
    var orig;

    beforeEach(function(done){
      orig = Todos.prototype.destroy;
      done();
    });

    afterEach(function(done){
      Todos.prototype.destroy = orig;
      done();
    });

    it('should return a 500 if an error occurs', function(done){

      // Given
      Todos.prototype.destroy = function(options, callback){
        callback(new Error('Error'));
      };

      internals.prepareServer(function(server){

        // When
        server.inject({
          method: 'DELETE',
          url: '/todos/123'
        }, function(response){

          // Then
          expect(response.statusCode).to.equal(500);

          done();
        });
      });
    });

    it('should return a 200 if successful', function(done){

      // Given
      Todos.prototype.destroy = function(options, callback){
        callback(null, options.id);
      };

      internals.prepareServer(function(server){

        // When
        server.inject({
          method: 'DELETE',
          url: '/todos/123'
        }, function(response){

          // Then
          expect(response.statusCode).to.equal(200);

          done();
        });
      });
    });
  });
});
