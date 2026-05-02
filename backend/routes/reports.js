const express=require('express')
const router=express.Router();
const mongoose=require('mongoose')

const verifyToken=require('../middleware/auth')
const verifyRole=require('../middleware/role')

const cloudinary=require('../config/cloudinary')
const upload=require('../middleware/upload')

const Booking=require('../models/bookingModel')
const Report=require('../models/reportModel') 

router.post('/upload', verifyToken, verifyRole('admin'), upload.single('report'),  async (req, res) => {
    try {
      const booking = await Booking.findById(req.body.bookingId);

      if (!booking) {
        return res.status(404).json({ message: 'No Bookings Found' });
      }

      const stream = cloudinary.uploader.upload_stream({ 
        resource_type: 'auto' 
    },
        async (error, uploadResult) => {
          if (error) {
            return res.status(500).json({ message: 'Upload Failed' });
          }

          const report = await Report.create({
            bookingId: booking._id,
            userId: new mongoose.Types.ObjectId(booking.userId),
            reportUrl: uploadResult.secure_url,
          });

          return res.status(201).json({
            message: 'Report uploaded successfully',
            report,
          });
        }
      );

      stream.end(req.file.buffer);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Report upload failed' });
    }
  }
);

router.get('/my-reports',verifyToken,async(req,res)=>{
    try{
        const reports=await Report.find({
        userId:req.user.id
    }).populate('bookingId');
    res.json(reports);
    } catch(error){
        console.log(error);
        res.status(500).json({message:'Failed to fetch reports'});
    }
})

module.exports=router;