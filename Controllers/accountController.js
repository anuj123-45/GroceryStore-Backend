
const userAcc = require('../models/userAccount');
const bcrypt=require('bcryptjs');



exports.registerUser = async (req, res) => {
    try {
        const { name, password, username, email } = req.body;
      const  newAccount = await userAcc.create({
            name, password, username, email
        })

 
        res.status(201).json({ success: true, newAccount });
    }

    catch (err) {
        res.json({ error: err })
    }

}

exports.loginUser=async(req,res)=>{
    try{

        const {email,password}=req.body;
         const user=await userAcc.findOne({email});
         console.log(user);
         if(!user){
            return res.status(401).json({message:"Invalid Email or password"});
         }

        const validPassword=await bcrypt.compare(password,user.password);
        if(!validPassword){
            return res.status(401).json({message:"Invalid email or password"});
        }
        const token = user.getJWTToken();
        res.status(200).json({data:token,message:"Logged in",user});


    }

    catch(err){
        return res.status(500).json({message:"Internal Server error"});
    }
}


