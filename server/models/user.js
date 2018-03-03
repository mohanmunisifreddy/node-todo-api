var mongoose = require('mongoose');

var {Schema} = mongoose;

var UserSchema = new Schema( {
	email: {
		type: String,
		required: true,
		minLength: 1,
		trim: true
	}
});

var User = mongoose.model('users', UserSchema);

module.exports = {User};