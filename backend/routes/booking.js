const express=require('express')
const router=express.Router();

const verifyToken=require("../middleware/auth")
const Booking=require("../models/bookingModel")

router.post("/",verifyToken,async(req,res)=>{
    try{

        const {appointmentDate,timeSlot}=req.body;
        //Checking booking count
        const existingBookings=await Booking.countDocuments({ appointmentDate, timeSlot })

        if(existingBookings>=5){
            return res.status(400).json({message:"Selected time slot is full. Choose another time!"})
        }

        const booking=await Booking.create({
            ...req.body,
            userId:req.user.id
        })

        res.status(201).json({message:"Booking Successfull",booking})
    }catch(error){
        res.status(500).json({message:'Booking Failed'})
    }
})

router.get("/my-bookings", verifyToken ,async(req,res)=>{
    try{
        const bookings=await Booking.find({
            userId:req.user.id
        }).populate('tests');
        res.json(bookings);
    }catch(error){
        console.log(error);
        res.status(500).json({message:'Failed to fetch bookings'})
    }
})

module.exports=router;