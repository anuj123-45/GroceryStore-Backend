const express=require('express');
const router=express.Router();
const {registerUser,loginUser} = require('../Controllers/accountController');
const {registerCheckout} = require('../Controllers/accountController');



router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/checkout").post(registerCheckout);
module.exports=router;