require('dotenv').config()



const mongoose = require('mongoose');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

//My routes

const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const categoryRoutes = require('./routes/category')





//db connection
//DATABASE=mongodb://localhost:27017/tshirt
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser:true,
    useUnifiedTopology: true,
    useCreateIndex: true,
}).then(()=>{
console.log("DB CONNECTED");
})

// Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors())


// Routes
app.use('/api', authRoutes);
app.use('/api',userRoutes);
app.use('/api',categoryRoutes);


//Port
const port = process.env.PORT || 8000;

//starting server
app.listen(port,()=>{
    console.log(`App is running on ${port}`);
});