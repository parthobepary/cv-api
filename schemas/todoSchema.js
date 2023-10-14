const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        default: 'partho bepary'
    },
    description: {
        type: String,
        required: true,
        default: 'hello partho. how are you?'

    },
    status: {
        type: Number,
        required: true,
        default: 1
    },
    date: {
        type: Date,
        default: Date.now
    }

});

module.exports = todoSchema;