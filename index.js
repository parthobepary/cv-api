// setup
const express = require('express');
const cors = require('cors');
const port = process.env.port || 5000

const app = express();

const mongoose = require('mongoose')
// middleware 
app.use(cors());
app.use(express.json());



const conn_str = `mongodb+srv://beparypartho70:dbmIaMFvSdCXiOd2@cluster0.zci0u8l.mongodb.net/newDatabase?retryWrites=true&w=majority`;


// db connection

mongoose.connect(conn_str, {
    useNewUrlParser: true
}).then((conn) => {
    console.log('DB connect');
}).catch((err) => {
    console.log('Some error has occured');
})

// mongoose schema

const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    duration: Number,
    rating: Number
});

const Movie = mongoose.model('Movie', movieSchema);

const testMovie = new Movie({
    name: 'Die hard',
    description: 'how to connect remote mongo db in express js via mongoose',
    duration: 123,
    rating: 0.2
});

testMovie.save()
    .then(doc => {
        console.log(doc);
    })
    .catch(er => {
        console.log(er);
    })



//api route

app.get('/', (req, res) => {
    res.send('Hello world')
})
app.listen(port, () => {
    console.log('app is running', port);
}) 