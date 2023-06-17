const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

const accountSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
 
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
 createdAt:{
    type:Date,
    default:Date.now
 }

})
accountSchema.pre("save",async function(next){
    if(!this.isModified("password")){
           next();
    }
    this.password= await bcrypt.hash(this.password, 10);
})

// JWT token
accountSchema.methods.getJWTToken=function (){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
      expiresIn:process.env.JWT_EXPIRE
    })
}

module.exports=mongoose.model("accountinfo",accountSchema);