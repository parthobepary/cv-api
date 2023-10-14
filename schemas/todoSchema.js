const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    description: String,
    status: {
        type: Number,
        require: true
    },
    date: {
        type: Date,
        default: Date.now
    }

});

module.exports = todoSchema;