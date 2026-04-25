const mongoose = require('mongoose');

const technicianSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Name is required'],
        minLength:[3,'Name must be at least 3 characters long'],
    },
    phone:{
        type:String,
        required:[true,'Phone is required'],
        unique:true,
        match:[/^[0-9]{10}$/,'Please provide a valid phone number']
    },
    assignedBookings:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Booking'
    }
},{timestamps:true});

module.exports=mongoose.model('Technician',technicianSchema);