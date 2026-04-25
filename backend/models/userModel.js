const mongoose = require('mongoose');

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Name is required'],
        minLength:[3,'Name must be at least 3 characters long'],
        maxLength:[50,'Name must be less than 50 characters long']
    },
    email:{
        type:String,
        required:[true,'Email is required'],
        unique:true,
        lowercase:true,
        match:[/^[^\s@]+@[^\s@]+\.[^\s@]+$/,'Please provide a valid email address']
    },
    phone:{
        type:String,
        required:[true,'Phone is required'],
        unique:true,
        match:[/^[0-9]{10}$/,'Please provide a valid phone number']
    },
    password:{
        type:String,
        required:[true,'Password is required'],
        minLength:[6,'Password must be at least 6 characters long']
    },
    address:{
        type:String,
        required:[true,'Address is required'],
        minLength:[10,'Address must be at least 10 characters long'],
        maxLength:[200,'Address must be less than 200 characters long']
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    }
},{timestamps:true});

module.exports=mongoose.model('User',userSchema);