const mongoose = require('mongoose');

const reportSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:[true,'User ID is required']
    },
    bookingId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Booking',
        required:[true,'Booking ID is required']
    },
    reportUrl:{
        type:String,
        required:[true,'Report URL is required']
    },
    uploadAt:{
        type:Date,
        default:Date.now
    }
},{timestamps:true});

module.exports=mongoose.model('Report',reportSchema);