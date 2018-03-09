const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {User} = require('./../models/user');
const {todos, populateTodos, users, populateUsers} = require('./seed/seed');

beforeEach(populateUsers);
beforeEach(populateTodos);

describe('POST /todos', () => {

	it('should create a new todo', (done) => {
		var text = 'Test some todos';

		request(app)
		.post('/todos')
		.send({text})
		.expect(200)
		.expect( (res) => {
			expect(res.body.text).toBe(text);
		})
		.end( (err, res) => {
			if(err) {
				return done(err);
			}

			Todo.find({text}).then( (todos) => {
				expect(todos.length).toBe(1);
				expect(todos[0].text).toBe(text);
				done();
			}).catch( (e) => done(e));
		});
	});

	it('should not create todo with invalid body data', (done) => {

		request(app)
		.post('/todos')
		.send({})
		.expect(400)
		.end((err, res) => {
			if (err) {
				return done(err);
			}

			Todo.find().then( (todos) => {
				expect(todos.length).toBe(2);
				done();
			}).catch( (err) => done(err));
		});
	});
});

describe('GET /todos', () => {
	it('should get all todos', (done) => {
		request(app)
		.get('/todos')
		.expect(200)
		.expect( (res) => {
			expect(res.body.todos.length).toBe(2);
		})
		.end(done());
	});	
});

describe('GET /todos/:id', () => {
	it('should return todo doc', (done) => {
		request(app)
		.get(`/todos/${todos[0]._id.toHexString()}`)
		.expect(200)
		.expect( (res) => {
			// console.log(res.body);
			expect(res.body.todo.text).toBe(todos[0].text);
		})
		.end(done);
	});

	it('should return a 404 if todo not found', (done) => {
		var id = new ObjectID();
		request(app)
		.get(`/todos/${id.toHexString()}`)
		.expect(404)
		.end(done);
	});

	it('should return 404 for non-object ids', (done) => {
		request(app)
		.get(`/todos/1322`)
		.expect(404)
		.end(done);
	});
});	

describe('DELETE /todos/:id', () => {
	it('should remove a todo', (done) => {
		var hexId = todos[1]._id.toHexString();
		request(app)
		.delete(`/todos/${hexId}`)
		.expect(200)
		.expect( (res) => {
			expect(res.body.todo._id).toBe(hexId);
		})
		.end( (err, res) => {
			if (err) {
				return done(err);
			}

			Todo.findById(hexId).then( (todo) => {
				expect(todo).toBeFalsy();
				done();
			}).catch((err) => done(err));
		});
	});

	it('should return 404 if todo not found', (done) => {
		var id = new ObjectID();
		request(app)
		.get(`/todos/${id.toHexString()}`)
		.expect(404)
		.end(done);
	});

	it('should return 404 if object id is invalid', (done) => {
		request(app)
		.get(`/todos/1322`)
		.expect(404)
		.end(done);
	});
});

describe('PATCH /todos/:id', () => {
	it('should update the todo', (done) => {
		var hexId = todos[0]._id.toHexString();
		var text = 'This is attached while testing';
		request(app)
		.patch(`/todos/${hexId}`)
		.send({text,
			completed: true
		})
		.expect(200)
		.expect( (res) => {
			// console.log(res.body);
			expect(res.body.todo.text).toBe(text);
			expect(res.body.todo.completed).toBe(true);
			expect(typeof res.body.todo.completedAt).toBe('number');
			// done();
		})
		.end(done);
	});

	it('should clear completedAt when todo is not completed', (done) => {
		var hexId = todos[1]._id.toHexString();
		var text = 'This is going to be the second text';

		request(app)
		.patch(`/todos/${hexId}`)
		.send({text,
			completed: false
		})
		.expect(200)
		.expect( (res) => {
			expect(res.body.todo.text).toBe(text);
			expect(res.body.todo.completed).toBe(false);
			expect(res.body.todo.completedAt).toBeFalsy();
		})
		.end(done());
	});
});	

describe('GET /users/me', () => {
	it('should return user if authenticated', (done) => {
		request(app)
		  .get('/users/me')
		  .set('x-auth', users[0].tokens[0].token)
		  .expect(200)
		  .expect( (res) => {
		  		expect(res.body._id).toBe(users[0]._id.toHexString());
		  		expect(res.body.email).toBe(users[0].email);
		  })
		  .end(done);	
	});

	it('should return 401 if not authenticated', (done) => {
		request(app)
		  .get('/users/me')
		  .expect(401)
		  .expect( (res) => {
		  		expect(res.body).toEqual({});
		  })
		  .end(done);
	});
});

describe('POST /users', () => {
	it('should create a new user', (done) => {
		var email = 'mohana@gmail.com';
		var password = 'mmmooo';
		request(app)
			.post('/users')
			.send({email,password})
			.expect(200)
			.expect( (res) => {
				expect(res.headers['x-auth']).toBeTruthy();
				console.log(res.body);
				expect(res.body.user._id).toBeTruthy();
				expect(res.body.user.email).toBe(email);
			})
			.end( (err) => {
				if (err) {
					return done(err);
				}
				User.findOne({email}).then( (user) => {
					expect(user).toBeTruthy();
					expect(user.password).not.toBe(password);
					done();
				});
			});
	});

	it('should return validation errors if request invalid', (done) => {
		var email = 'mohan';
		var password = 'dd';
		request(app)
			.post('/users')
			.send({email, password})
			.expect(400)
			.end(done);
	});

	it('should not create new user if email in use', (done) => {
		var email = 'mohan@example.com';
		var password = 'dmfnfnnj';
		request(app)
			.post('/users')
			.send({email, password})
			.expect(400)
			.end(done);
	});
});