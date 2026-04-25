const mongoose = require('mongoose');

const bookingSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:[true,'User ID is required']
    },
    tests:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Test',
        required:[true,'Tests are required']
    },
    appointmentDate:{
        type:Date,
        required:[true,'Appointment date is required'],
        validate:{
            validator:function(value){
                return value >= new Date().setHours(0,0,0,0);
            },
            message:'Appointment date must be in the future'
        }
    },
    timeSlot:{
        type:String,
        required:[true,'Time slot is required'],
        enum:["09:00 AM",
            "10:00 AM",
            "11:00 AM",
            "12:00 PM",
            "02:00 PM",
            "03:00 PM",
            "04:00 PM"
        ]
    },
    address:{
        type:String,
        required:[true,'Address is required'],
                minLength:[5,'Address must be at least 5 characters long'],
    },
    reportUpload:{
        type:String,
        default:'false'
    }
},{timestamps:true});

module.exports=mongoose.model('Booking',bookingSchema);