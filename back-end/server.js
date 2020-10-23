var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');
var port = process.env.PORT || 5000

app.use(bodyParser.json())
app.use(cors())
app.use (
    bodyParser.urlencoded({extended: false})
)

require('dotenv').config(); // to read .env file


const mongoURI = process.env.ATLAS_URI;

mongoose
    .connect(mongoURI, {useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('DataBase connected to the server'))
    .catch(err => console.log(err))

const todos = require ('./routes/todos')
app.use(todos)

app.listen(port, () => {
    console.log(`Server is running on ${port} Visit https://localhost:${port}`)
})