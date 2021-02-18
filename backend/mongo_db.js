


// const MongoClient = require('mongodb').MongoClient;
// function connect(){

// const uri = ;
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   if(err)
//   throw err;
//   else
//   console.log('connected to MongoDB');
 
// });

// }
// connect();


var mongoose=require("mongoose");
mongoDB="mongodb+srv://jayesh:jayesh123@cluster0.xtvnk.mongodb.net/Flight-reservation?retryWrites=true&w=majority";

mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
module.exports=mongoose;

