// setup
const express = require('express');
const cors = require('cors');
require("dotenv").config();
const mongoose = require('mongoose')
const body_parser = require('body-parser');

//variable 
const port = process.env.PORT || 5000;
const uri = process.env.DB_LOCAL_STR;

// controllers
const todoController = require('./controller/todoController');
const contactController = require('./controller/contactController');

const app = express();

// middleware 
app.use(cors());
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: true }));


const db_connect = async () => {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, family: 4 })
        .then(() => console.log('connection successful'))
        .catch((er) => console.log(er))

}

db_connect()



// application route

app.use('/api/todo', todoController);
app.use('/api/contact', contactController);

app.get('/', (req, res) => {
    res.send('Hello world')
})

app.listen(port, () => {
    console.log('app is running', port);
})



// shift+alt+f -> formatting code