const express = require('express')
const mongoose = require('mongoose')
const handlebars = require('express-handlebars')

mongoose.Promise = global.Promise

let env = process.env.NODE_ENV || 'development'
let port = process.env.PORT || 1337

let app = express()

app.engine('handlebars', handlebars({
    defaultLayout: 'main'
}))
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/', (req, res) => {
    mongoose 
        .connect('mongodb://localhost:27017/generictemplate') //TODO: change db name by base of project
        .then(() => {
            console.log('MongoDB ready!')

            res.render('index')
        })     
})

app.listen(port)
console.log(`Server listening at port ${port}`)