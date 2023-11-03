// setup
const express = require('express');
const cors = require('cors');
require("dotenv").config();
const mongoose = require('mongoose')
const body_parser = require('body-parser');
const { verifyAccessToken } = require('./helpers/jwt_token');
const createHttpError = require('http-errors');


//variable 
const port = process.env.PORT || 5000;
const uri = process.env.DB_LOCAL_STR;

// controllers
const todoController = require('./controller/todoController');
const contactController = require('./controller/contactController');
const authController = require('./controller/authController')

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
app.use('/api/auth', authController);


//error handel

app.use(async (req, res, next) => {
    const error = new Error('Not fond')
    error.status = 404;
    next(error)
});
app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    })
})

// route

app.get('/', verifyAccessToken, (req, res) => {
    res.send('Hello world')
})

app.listen(port, () => {
    console.log('app is running', port);
})



// shift+alt+f -> formatting code