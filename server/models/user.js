var mongoose = require('mongoose');

var {Schema} = mongoose;

var User = new Schema( {
	email: {
		type: String,
		required: true,
		minLength: 1,
		trim: true
	}
});

module.exports = {User};