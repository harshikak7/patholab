const mongoose=require('mongoose');

const testSchema=new mongoose.Schema({
    testName:{
        type:String,
        required:true,
        unique:true
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    preparationRequired:{
        type:Boolean,
        required:true
    },
    reportTime:{
        type:Number,
        required:true
    }
},{timestamps:true});

module.exports=mongoose.model('Test',testSchema);