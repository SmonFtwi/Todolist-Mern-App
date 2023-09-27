if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }
const express = require('express');
const cors =require('cors');
const mongoose= require('mongoose');
const toDoRoute = require('./routes/todo')
const authRoute = require('./routes/auth');


const app = express();

app.use(express.json());
 
app.use(cors());
//data base
const mongoDB = process.env.mongoDB;

mongoose.connect(mongoDB, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }),

// routes

app.use('/' , authRoute)
app.use('/' , toDoRoute)




app.listen(3001 , () => {
    console.log('server running on port 3001')
})