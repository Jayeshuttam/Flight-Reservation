


const MongoClient = require('mongodb').MongoClient;
function connect(){

const uri = "mongodb+srv://jayesh:<password>@cluster0.xtvnk.mongodb.net/Fl?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  if(err)
  throw err;
  else
  console.log('connected to MongoDB');
 
});

}
connect();
