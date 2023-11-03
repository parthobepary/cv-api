const mongoose = require('mongoose');

mongoose
    .connect('mongodb://localhost:27017', { dbName: 'todos', useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('db connection success');
    })
    .catch((err) => console.log(err.message))

mongoose.connection.on('connected', () => {
    console.log("Mongoose connected to db");
})