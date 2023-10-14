const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// import models schemas
const todoSchema = require('../schemas/todoSchema');
const Todo = new mongoose.model('Todo', todoSchema);


// define route

router.get('/', async (req, res) => {
    return 'success connect controller'
});

router.post('/', async (req, res) => {
    const newTodo = new Todo(req.body);
    console.log(newTodo);
    // await newTodo.save((err) => {
    //     if (err) {
    //         res.status(500).json({
    //             error: 'server error'
    //         })
    //     }
    //     else {
    //         res.status(200).json({
    //             message: 'create success'
    //         })
    //     }
    // })
});


module.exports = router;