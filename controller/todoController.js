const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// import schemas and make models
const todoSchema = require('../schemas/todoSchema');
const Todo = new mongoose.model('Todo', todoSchema);


// define route

router.get('/', async (req, res) => {
    await Todo.find({})
        .then((result) => {
            return res.send({
                data: result,
                status: 200
            })
        })
        .catch((err) => {
            return res.send('server error');
        })
});

router.get('/:id', async (req, res) => {
    await Todo.find({ _id: req.params.id })
        .then((result) => {
            return res.send({ status: 200, data: result })
        })
        .catch((error) => {
            return res.send({ status: 500, message: 'server error' })
        })
});

router.put('/:id', async (req, res) => {
    await Todo.updateOne({ _id: req.params.id }, {
        $set: {
            status: 10
        }
    })
        .then(() => {
            return res.send({ status: 200, message: 'Success' })
        })
        .catch((error) => {
            return res.send({ status: 500, message: 'server error' });

        });
})

router.post('/', async (req, res) => {
    const newTodo = new Todo(req.body);

    await newTodo.save()
        .then((result) => {
            return res.send({ status: 200, message: 'Success', result })
        })
        .catch((error) => {
            return res.send({ status: 500, message: 'server error', error});

        });
});


module.exports = router;


// https://www.youtube.com/watch?v=83ijtzyWi78&list=PLp50dWW_m40WYEuXSf4RmrKmOtWC5k3bU&index=11