const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    }

});

module.exports = todoSchema;