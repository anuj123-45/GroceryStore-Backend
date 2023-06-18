
const userAcc = require('../models/userAccount');
const usermodel=require('../models/prodDetails');
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
        res.status(200).json({data:token,message:"Login Success !!!"});


    }

    catch(err){
        return res.status(500).json({message:"Internal Server error"});
    }
}


exports.registerCheckout=async(req,res)=>{
    const {
        firstName,
        lastName,
        email,
        phone,
        address,
        totalCost,
        purchased_items,
      } = req.body;
    
    
        try{
            const getspecific=await usermodel.findOne({
                email:email,
            })
            if(!getspecific){
                const user = {
    
                    firstName: String(firstName),
                    lastName: String(lastName),
                    email: String(email),
                    phone: Number(phone),
                    address: String(address),
                    purchased_items: Array(JSON.parse(purchased_items)),
                    totalCost: Number(totalCost),
                  
                };
                await usermodel.create(user);
    
                return res.status(200).json({message:"Data Saved"});
            }
            else {
              return res.status(409).json({message:"Email already exists"});
            }
        }
        catch(err){
            res.json({err:err.message});
        }
}

