const mongoose=require('mongoose');

const connectDatabase=()=>{
    mongoose.connect(process.env.DB,{

        useNewUrlParser: true,
        useUnifiedTopology: true,
        
        }).then(()=>{
            console.log(`Database connected successfully`);
        }).catch((err)=>{
            console.log(`${err}`);
        })
}

module.exports=connectDatabase;