// setup
const express = require('express');
const cors = require('cors');
const morgan = require('morgan')
require("dotenv").config();
require("./helpers/init_mongo");
const mongoose = require('mongoose')
const body_parser = require('body-parser');
const { verifyAccessToken } = require('./helpers/jwt_token');
const createHttpError = require('http-errors');
const redisClient = require('./helpers/init_redis')

redisClient.SET('name', 'partho')

// redis code

//variable 
const port = process.env.PORT || 5000;

// controllers
const todoController = require('./controller/todoController');
const contactController = require('./controller/contactController');
const authController = require('./controller/authController')

const app = express();

// middleware 
app.use(cors());
app.use(morgan('dev'));
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: true }));



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