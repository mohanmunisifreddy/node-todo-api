const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// var id = '5a9a137f659d6123e256be0011';

// ObjectID.isValid(id) ? console.log('Id is valid') : console.log('Id is not valid');
// Todo.find({
// 	_id: id
// }).then( (todos) => {
// 	console.log('Todos', todos);
// });

// Todo.findOne( {
// 	_id: id
// }).then( (todo) => {
// 	console.log('Todo', todo);
// });

// Todo.findById(id).then( (todo) => {
// 	if (!todo) {
// 		return console.log('Id not found');
// 	}
// 	console.log('Todo By Id', todo);
// }).catch((err) => console.log('Invalid Id'));''

// return console.log("Can't go down");

var id = '5a940f3cb54ddf15ae80f0c2';

User.findById(id).then( (user) => {
	if (!user) {
		return console.log('user not found');
	}

	console.log(user);
}, (err) => {
		console.log(err);
});