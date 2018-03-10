const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const users = [ {
	_id: userOneId,
	email: 'mohan@example.com',
	password: 'userOnePass',
	tokens: [{
		access: 'auth',
		token: jwt.sign({_id: userOneId, access: 'auth'}, process.env.JWT_SECRET).toString()
	}]
}, {
	_id: userTwoId,
	email: 'manisha@example.com',
	password: 'userTwoPass'
}];

const todos = [ {
	_id: new ObjectID(),
	text: 'First test todo',
	_creator: userOneId
}, {
	_id: new ObjectID(),
	text: 'Second test todo',
	completed: true,
	completedAt: 433333,
	_creator: userTwoId
}];

const populateTodos = (done) => {
	Todo.remove({}).then( () => {
		return Todo.insertMany(todos);
	}).then( () => done());
};

const populateUsers = (done) => {
	// User.remove({}).then( () => {
	// 	var userOne = new User(users[0]).save();
	// 	var userTwo = new User(users[1]).save();

	// 	return Promise.all([userOne, userTwo]);
	// }).then( () => done()).catch( (err) => {
	// 	return done(err);
	// });
	User.remove({}).then( () => {
		return User.insertMany(users);
	}).then( () => done());
};

module.exports = {todos, populateTodos, users, populateUsers};