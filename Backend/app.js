const dotenv=require('dotenv');
const axios = require('axios');
dotenv.config();
const cors = require('cors');
const express=require('express');
const app=express();
const connectDB=require('./db/db');
const userRoutes=require('./routes/user.routes');
const userController=require('./controllers/user.controller');
const cookieParser=require('cookie-parser');
const captainRoutes = require('./routes/captain.routes');
connectDB();
const mapsRoutes=require('./routes/maps.routes')
const rideRoutes=require('./routes/ride.routes')

app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/users',userRoutes);
app.use('/captain',captainRoutes);
app.get('/',(req,res)=>{
    res.send('Hello World');
});
app.use('/maps',mapsRoutes)
app.use('/rides',rideRoutes)


module.exports=app;