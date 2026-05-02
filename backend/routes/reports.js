const express=require('express')
const router=express.Router();

const verifyToken=require('../middleware/auth')
const verifyRole=require('../middleware/role')

const Report=require('../models/reportModel') 

router.post('/upload',verifyToken,verifyRole('admin'),async(req,res)=>{
    try{

        const booking=await Booking.findById(req.body.bookingId);

        if(!booking){
            res.status(401).json({message:'No Bookings Found'})
        }

        const report=await Report.create({
            bookingId:booking._id,
            userId:booking.userId,
            reportUrl:req.body.reportUrl
        });
        res.status(201).json({message:'Report uploaded successfully',report});
    } catch(error){
        console.log(error);
        res.status(500).json({message:'Report upload failed'})
    }
})
router.get("/my-reports",verifyToken,async(req,res)=>{
    try{
        const reports=await Report.find({
            userId:req.user.id,
        }).populate('bookingId');
        res.json(reports);
    } catch(error){
        console.log(error);
        res.status(500).json({message:'Failed to fetch reports'});
    }
})

module.exports=router;