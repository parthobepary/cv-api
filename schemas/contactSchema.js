const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: [true, "First name is required"],
        minLength: 3,
        maxLength: 60,
        trim: true,
        validate: {
            validator: function (value) {
                const nameRegex = /^[a-zA-Z\s]*$/;
                return nameRegex.test(value);
            }
        }
    },
    last_name: {
        type: String,
        required: [true, "Last name is required"],
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Contact', contactSchema);