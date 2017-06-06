const express = require('express')
const mongoose = require('mongoose')

mongoose.Promise = global.Promise

let env = process.env.NODE_ENV || 'development'
let port = process.env.PORT || 1337

let app = express()

app.get('/', (req, res) => {
    mongoose 
        .connect('mongodb://localhost:27017/generictemplate') //TODO: change db name by base of project
        .then(() => {
            console.log('MongoDB ready!')

            res.send('OK')
        })     
})

app.listen(port)
console.log(`Server listening at port ${port}`)