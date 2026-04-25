const mongoose = require('mongoose');
const Test=require('./models/testModel');

const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));

app.use(express.json());

//Api routes
app.get('/tests',async(req,res)=>{
    try{
        const tests=await Test.find();
        res.json(tests);
    } catch(error){
        res.status(500).json({message:'Error fetching tests',error});
    }
});
//Required to start
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})