 var {MongoClient, ObjectID} = require('mongodb');

 MongoClient.connect('mongodb://localhost:27017', (err, client) => {
 	if (err) {
 		return	console.log('Unable to connect to MongoDB server');
 	} 
 	console.log('Connected to MongoDB server');

 	var db = client.db('TodoApp');

//deleteMany
 	// db.collection('Todos').deleteMany({text: 'Eat lunch'}).then( (result) => {
 		// console.log(result);
 	// });
 	// db.collection('Users').deleteMany({name: 'Mohan Munisifreddy'}).then( (result) => {
 	// 	console.log(result.result);
 	// });

 	db.collection('Users').findOneAndDelete({_id: new ObjectID('5a879022f26e7b157d06dea3')});

// // findOneAndDelete
// 	db.collection('Todos').findOneAndDelete({completed: false}).then( (result) => {
// 		console.log(result.value._id);
// 	});

 	// client.close();
 });