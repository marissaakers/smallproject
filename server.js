const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')

const userRouter = require('./routes/user')
const contactRouter = require('./routes/contact')

// Connecting to mongo database
try{
    mongoose.connect('mongodb+srv://ryan:contactmanagerpw@contact-manager-ptzoy.mongodb.net/test?retryWrites=true&w=majority',{
    useNewUrlParser: true
  })
} catch(error) {
  console.log(error)
}

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
// Allows front-end and api to talk to eachother
app.use(cors())

app.use('/users', userRouter)
app.use('/contacts', contactRouter)

module.exports = app
