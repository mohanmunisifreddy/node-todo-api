 var {MongoClient, ObjectID} = require('mongodb');

 MongoClient.connect('mongodb://localhost:27017', (err, client) => {
 	if (err) {
 		return	console.log('Unable to connect to MongoDB server');
 	} 
 	console.log('Connected to MongoDB server');

 	var db = client.db('TodoApp');

 	// db.collection('Todos').find({
 	// 	_id: new ObjectID('5a868659ae031c1928c1d830')
 	// }).toArray().then((docs) => {
 	// 	console.log('Todos:');
 	// 	console.log(JSON.stringify(docs, undefined, 2));
 	// }, (err) => {
 	// 	console.log(err);
 	// });

 	// db.collection('Todos').find().count().then((count) => {
 	// 	console.log('Todos count:' + count);
 	// 	// console.log(JSON.stringify(docs, undefined, 2));
 	// }, (err) => {
 	// 	console.log(err);
 	// });

 	db.collection('Users').find({name: 'Manisha'}).toArray().then((docs) => {
 		console.log(JSON.stringify(docs, undefined, 3));
 	}, (err) => {
 		console.log(err);
 	});

 	// client.close();
 });