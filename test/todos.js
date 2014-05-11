/* jshint expr: true, es5: true */

// Load modules
var Lab = require('lab'),
    Hapi = require('hapi'),
    Todos = require('todos-lib'),

    // Declare internals
    internals = {},

    // Declare configs
    orchestrateUrl = 'https://api.orchestrate.io/',
    baseUri = '/v0/todos',

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
    server.pack.require(['../', 'hapi-auth-hawk'], function(err){

        expect(err).to.not.exist;

        server.auth.strategy('hawk', 'hawk', { getCredentialsFunc: function(id, callback){
            return callback({
                id: 'john',
                key: 'werxhqb98rpaxn39848xrunpaw3489ruxnpa98w4rxn',
                algorithm: 'sha256'
            });
        }});

        callback(server);
    });
};

describe('Todos', function(){

    describe('GET', function(){

        it('passes null as the options if called without an id', function(done){

            // Given
            internals.prepareServer(function(server){
                var orig = Todos.prototype.get;
                Todos.prototype.get = function(options, callback){
                    callback(null, {});

                    // Then
                    expect(options.id).to.be.undefined;
                    expect(options.user).to.equal('123');

                    Todos.prototype.get = orig;
                    done();
                };

                // When
                server.inject({ method: 'GET', url: '/users/123/todos' }, function(response){});
            });
        });

        it('passes an options object with the passed id if an id is passed', function(done){

            // Given
            internals.prepareServer(function(server){
                var orig = Todos.prototype.get;
                Todos.prototype.get = function(options, callback){
                    callback(null, {});

                    // Then
                    expect(options.id).to.equal('123');

                    Todos.prototype.get = orig;
                    done();
                };

                // When
                server.inject({ method: 'GET', url: '/users/123/todos/123' }, function(response){});
            });
        });

        it('returns a 404 if an id is passed, but no object is found', function(done){

            // Given
            internals.prepareServer(function(server){

                var orig = Todos.prototype.get;
                Todos.prototype.get = function(options, callback){
                    callback(null, null);
                };

                // When
                server.inject({ method: 'GET', url: '/users/123/todos/123' }, function(response){

                    // Then
                    expect(response.statusCode).to.equal(404);

                    Todos.prototype.get = orig;
                    done();
                });
            });
        });

        it('returns a 500 if an error is returned when trying to access by id', function(done){

            // Given
            internals.prepareServer(function(server){

                var orig = Todos.prototype.get;
                Todos.prototype.get = function(options, callback){
                    callback(new Error());
                };

                // When
                server.inject({ method: 'GET', url: '/users/123/todos/123' }, function(response){

                    // Then
                    expect(response.statusCode).to.equal(500);

                    Todos.prototype.get = orig;
                    done();
                });
            });
        });

        it('returns a 500 if an error is returned when trying to access all', function(done){

            // Given
            internals.prepareServer(function(server){

                var orig = Todos.prototype.get;
                Todos.prototype.get = function(options, callback){
                    callback(new Error());
                };

                // When
                server.inject({ method: 'GET', url: '/users/123/todos' }, function(response){

                    // Then
                    expect(response.statusCode).to.equal(500);

                    Todos.prototype.get = orig;
                    done();
                });
            });
        });

    });

    describe('POST', function(){

        it('requires a title', function(done){

            // Given
            internals.prepareServer(function(server){

                // When
                server.inject({
                    method: 'POST',
                    url: '/users/123/todos',
                    payload: JSON.stringify({})
                }, function(response){

                    // Then
                    expect(response.statusCode).to.equal(400);

                    done();
                });
            });
        });

        it('should accept a valid status of `done`', function(done){

            // Given
            internals.prepareServer(function(server){

                var orig = Todos.prototype.create;
                Todos.prototype.create = function(options, callback){
                    callback(null, '123');
                };

                // When
                server.inject({
                    method: 'POST',
                    url: '/users/123/todos',
                    payload: JSON.stringify({
                        title: 'Test',
                        status: 'done'
                    })
                }, function(response){

                    // Then
                    expect(response.statusCode).to.equal(201);
                    Todos.prototype.create = orig;
                    done();
                });
            });
        });

        it('should accept a valid status of `in progress`', function(done){

            // Given
            internals.prepareServer(function(server){

                var orig = Todos.prototype.create;
                Todos.prototype.create = function(options, callback){
                    callback(null, '123');
                };

                // When
                server.inject({
                    method: 'POST',
                    url: '/users/123/todos',
                    payload: JSON.stringify({
                        title: 'Test',
                        status: 'in progress'
                    })
                }, function(response){

                    // Then
                    expect(response.statusCode).to.equal(201);
                    Todos.prototype.create = orig;
                    done();
                });
            });
        });

        it('should accept a valid status of `not started`', function(done){

            // Given
            internals.prepareServer(function(server){

                var orig = Todos.prototype.create;
                Todos.prototype.create = function(options, callback){
                    callback(null, '123');
                };

                // When
                server.inject({
                    method: 'POST',
                    url: '/users/123/todos',
                    payload: JSON.stringify({
                        title: 'Test',
                        status: 'not started'
                    })
                }, function(response){

                    // Then
                    expect(response.statusCode).to.equal(201);
                    Todos.prototype.create = orig;
                    done();
                });
            });
        });

        it('should reject an invalid status', function(done){

            // Given
            internals.prepareServer(function(server){

                // When
                server.inject({
                    method: 'POST',
                    url: '/users/123/todos',
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
            internals.prepareServer(function(server){

                var orig = Todos.prototype.create;
                Todos.prototype.create = function(options, callback){
                    callback(null, options.id);
                };

                // When
                server.inject({
                    method: 'POST',
                    url: '/users/123/todos',
                    payload: JSON.stringify({
                        title: 'Test'
                    })
                }, function(response){

                    // Then
                    expect(response.result.status).to.equal('not started');

                    Todos.prototype.create = orig;
                    done();
                });
            });
        });

        it('returns a 201 status code if successful', function(done){

            // Given
            internals.prepareServer(function(server){

                var orig = Todos.prototype.create;
                Todos.prototype.create = function(options, callback){
                    callback(null, options.id);
                };
                // When
                server.inject({
                    method: 'POST',
                    url: '/users/123/todos',
                    payload: JSON.stringify({
                        title: 'Test'
                    })
                }, function(response){

                    // Then
                    expect(response.statusCode).to.equal(201);

                    Todos.prototype.create = orig;
                    done();
                });
            });
        });

        it('returns a location header of `/todos/{id}` if successful', function(done){

            // Given
            internals.prepareServer(function(server){

                var orig = Todos.prototype.create;
                Todos.prototype.create = function(options, callback){
                    callback(null, 123);
                };

                // When
                server.inject({
                    method: 'POST',
                    url: '/users/123/todos',
                    payload: JSON.stringify({
                        title: 'Test'
                    })
                }, function(response){

                    // Then
                    expect(response.headers.location).to.include('/todos/123');

                    Todos.prototype.create = orig;
                    done();
                });
            });
        });

        it('returns a 500 if an error occurs', function(done){

            // Given
            internals.prepareServer(function(server){

                var orig = Todos.prototype.create;
                Todos.prototype.create = function(options, callback){
                    callback(new Error());
                };

                // When
                server.inject({
                    method: 'POST',
                    url: '/users/123/todos',
                    payload: JSON.stringify({
                        title: 'Test'
                    })
                }, function(response){

                    // Then
                    expect(response.statusCode).to.equal(500);

                    Todos.prototype.create = orig;
                    done();
                });
            });
        });

    });

    describe('PUT', function(){

        it('returns a 500 if an error occurs', function(done){

            // Given
            internals.prepareServer(function(server){

                var orig = Todos.prototype.update;
                Todos.prototype.update = function(options, callback){
                    callback(new Error());
                };

                // When
                server.inject({
                    method: 'PUT',
                    url: '/users/123/todos/123',
                    payload: JSON.stringify({
                        title: 'Test',
                        status: 'not started'
                    })
                }, function(response){

                    // Then
                    expect(response.statusCode).to.equal(500);

                    Todos.prototype.update = orig;
                    done();
                });
            });
        });

        it('requires a title', function(done){

            // Given
            internals.prepareServer(function(server){

                // When
                server.inject({
                    method: 'PUT',
                    url: '/users/123/todos/123',
                    payload: JSON.stringify({
                    })
                }, function(response){

                    // Then
                    expect(response.statusCode).to.equal(400);

                    done();
                });
            });
        });


        it('requires a status', function(done){

            // Given
            internals.prepareServer(function(server){

                // When
                server.inject({
                    method: 'PUT',
                    url: '/users/123/todos/123',
                    payload: JSON.stringify({
                    })
                }, function(response){

                    // Then
                    expect(response.statusCode).to.equal(400);

                    done();
                });
            });
        });

        it('accepts a valid status of `done`', function(done){

            // Given
            internals.prepareServer(function(server){

                var orig = Todos.prototype.update;
                Todos.prototype.update = function(options, callback){
                    callback(null, {});
                };

                // When
                server.inject({
                    method: 'PUT',
                    url: '/users/123/todos/123',
                    payload: JSON.stringify({
                        title: 'Test',
                        status: 'done'
                    })
                }, function(response){

                    // Then
                    expect(response.statusCode).to.equal(200);
                    Todos.prototype.update = orig;
                    done();

                });
            });
        });

        it('accepts a valid status of `in progress`', function(done){

            // Given
            internals.prepareServer(function(server){

                var orig = Todos.prototype.update;
                Todos.prototype.update = function(options, callback){
                    callback(null, {});
                };

                // When
                server.inject({
                    method: 'PUT',
                    url: '/users/123/todos/123',
                    payload: JSON.stringify({
                        title: 'Test',
                        status: 'in progress'
                    })
                }, function(response){

                    // Then
                    expect(response.statusCode).to.equal(200);
                    Todos.prototype.update = orig;
                    done();

                });
            });
        });

        it('accepts a valid status of `not started`', function(done){

            // Given
            internals.prepareServer(function(server){

                var orig = Todos.prototype.update;
                Todos.prototype.update = function(options, callback){
                    callback(null, {});
                };

                // When
                server.inject({
                    method: 'PUT',
                    url: '/users/123/todos/123',
                    payload: JSON.stringify({
                        title: 'Test',
                        status: 'not started'
                    })
                }, function(response){

                    // Then
                    expect(response.statusCode).to.equal(200);
                    Todos.prototype.update = orig;
                    done();

                });
            });
        });

        it('rejects an invalid status', function(done){

            // Given
            internals.prepareServer(function(server){

                // When
                server.inject({
                    method: 'PUT',
                    url: '/users/123/todos/123',
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
        it('returns a 500 if an error occurs', function(done){

            // Given
            internals.prepareServer(function(server){

                var orig = Todos.prototype.destroy;
                Todos.prototype.destroy = function(options, callback){
                    callback(new Error());
                };

                // When
                server.inject({
                    method: 'DELETE',
                    url: '/users/123/todos/123'
                }, function(response){

                    // Then
                    expect(response.statusCode).to.equal(500);

                    Todos.prototype.destroy = orig;
                    done();
                });
            });
        });

        it('returns a 204 if successful', function(done){

            // Given
            internals.prepareServer(function(server){

                var orig = Todos.prototype.destroy;
                Todos.prototype.destroy = function(options, callback){
                    callback(null, {});
                };

                // When
                server.inject({
                    method: 'DELETE',
                    url: '/users/123/todos/123'
                }, function(response){

                    // Then
                    expect(response.statusCode).to.equal(204);

                    Todos.prototype.destroy = orig;
                    done();
                });
            });
        });
    });
});
