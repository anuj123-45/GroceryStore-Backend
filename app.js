const express=require('express');
const app=express();

const cors=require('cors');
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const userAcc=require('./Routes/userAccRoute');
app.use("/ecommerce",userAcc);

module.exports=app;
