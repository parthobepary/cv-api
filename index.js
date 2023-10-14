// setup
const express = require('express');
const cors = require('cors');
require("dotenv").config();
const mongoose = require('mongoose')

//variable 
const port = process.env.PORT || 5000;
const uri = process.env.DB_LOCAL_STR;

// controllers
const todoController = require('./controller/todoController')

const app = express();

// middleware 
app.use(cors());
app.use(express.json());


// db_connect()
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, family: 4 })
    .then(() => console.log('connection successful'))
    .catch((er) => console.log(er))



// application route

app.use('/todo', todoController)

app.get('/', (req, res) => {
    res.send('Hello world')
})

app.listen(port, () => {
    console.log('app is running', port);
})



// shift+alt+f -> formatting code