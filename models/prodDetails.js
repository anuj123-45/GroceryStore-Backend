const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    firstName:String,
    lastName:String,
    email:String,
    phone:Number,
    address:String,
    purchased_items:Array,
    totalCost:Number,
})

const userModel= new  mongoose.model("userdetails",userSchema);
module.exports=userModel;