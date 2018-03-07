const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

var data = {
	id: 10
};

var token = jwt.sign(data, '123mohan');
console.log("Token:" + token);

var decoded = jwt.verify(token, '123mohan');
console.log("Decoded", decoded);
















// var message = 'My name is Mohan';
// var hash = SHA256(message);

// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);

// var data = {
// 	id: 4
// };


// var token = {data,
// 	hash: SHA256(JSON.stringify(data) + 'secret').toString()
// };

// // token.data.id = 5;
// // token.hash = SHA256(JSON.stringify(token.data)).toString();

// var resultHash =  SHA256(JSON.stringify(token.data) + 'secret').toString();

// if (resultHash === token.hash) {
// 	console.log('Authorized user');
// } else {
// 	console.log('Unauthorized user');
// }