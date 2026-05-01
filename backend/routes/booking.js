const express=require('express')
const router=express.Router();

const verifyToken=require("../middleware/auth")
const Booking=require("../models/bookingModel")

router.post("/",verifyToken,async(req,res)=>{
    try{
        const booking=await Booking.create({
            ...req.body,
            userId:req.user.id
        })

        res.status(201).json({message:"Booking Successfull",booking})
    }catch(error){
        res.status(500)/json({message:'Booking Failed'})
    }
})

module.exports=router;