const express=require('express');
const router=express.Router();
const User=require('../models/userModel');

const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

//Signup Route
router.post("/signup",async(req,res)=>{
    try{
        const {name, email, phone, password, address, role} = req.body;

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
            role
        });

        res.status(201).json({message:'Signup SUccesfull'});

    } catch(error){
        res.status(500).json({
            message:'Signup failed'
        })
    };  
});

//Login Route
