const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}).then( (result) => {
// 	console.log(result);
// });

Todo.findByIdAndRemove('5a9abb67aee274fe6ca45f22').then( (todo) => {
	console.log(todo);
});