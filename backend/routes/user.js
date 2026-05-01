const express=require('express');
const router=express.Router();
const User=require('../models/userModel');

const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

//Signup Route
router.post("/signup",async(req,res)=>{
    try{
        const {name, email, phone, password, address} = req.body;

        const existingUser=await User.findOne({email});
        
        if(existingUser){
            return res.status(400).json({message:'User already exists'});
        }
        
        const hashedPassword=await bcrypt.hash(password,10);

        const user=await User.create({
            name,
            email,
            phone,
            password:hashedPassword,
            address,
        });

        res.status(201).json({message:'Signup Successfull'});

    } catch(error){
        console.log(error);
        res.status(500).json({
            message:'Signup failed'
        })
    };  
});

//Login Route
router.post("/login",async(req,res)=>{
    try{
        const {email,password}=req.body;

        const user=await User.findOne({email});

        if(!user){
            return res.status(400).json({message:'Invalid Credentials'});
        }

        const isMatch=await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.status(400).json({message:'Invalid Credentials'});
        };

        const token=jwt.sign(
            {
                id:user._id,
                role:user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn:'1d',
            }
        );

        res.cookie('token',token,{
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 24 * 60 * 60 * 1000 //24 hours x 60 mins x 60 seconds x 1000ms (how long cookie stays in browser since 1day so this no)
        });

        res.json({message:'Login succesfull'});
    }catch(error){
        res.status(500).json({message:'Login Failed'});
    }
});

//Logout Route
router.post("/logout",(req,res)=>{
    res.clearCookie('token');
    res.json({message:'Logged out succesfully'});
});

module.exports=router;