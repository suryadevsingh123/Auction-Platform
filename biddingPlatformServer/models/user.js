const mongoose=require('mongoose');
const userSchema=new mongoose.Schema({
firstName:String,
lastName:String,
email:String,
password:String
})
const userModel=mongoose.model('users',userSchema);//it will create Users table and userSchema schema
module.exports=userModel;