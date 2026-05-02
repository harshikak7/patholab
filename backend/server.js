const mongoose = require('mongoose');
const Test=require('./models/testModel');

const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
const cookieParser = require('cookie-parser');

require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5000',
    credentials: true
}));
app.use(cookieParser());

//Api routes
app.get('/tests',async(req,res)=>{
    try{
        const tests=await Test.find();
        res.json(tests);
    } catch(error){
        res.status(500).json({message:'Error fetching tests',error});
    }
});

//User routes
const userRoutes=require('./routes/User');
app.use('/users',userRoutes);

const bookingRoutes=require('./routes/booking')
app.use("/bookings",bookingRoutes);

const reportRoutes=require('./routes/reports');
app.use('/reports',reportRoutes);

//Temp Protect route
const verifyToken=require('./middleware/auth')

app.get("/protected", verifyToken,(req,res)=>{
    res.status(200).json({message:"Access Granted",user:req.user});
})

//Required to start
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})