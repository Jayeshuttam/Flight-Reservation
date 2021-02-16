var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var user_schema=new Schema({
    first_name:String,
    last_Name:String,
    phone:Number,
    email:String,
    password:String
})

var Users=mongoose.model("Users",user_schema);