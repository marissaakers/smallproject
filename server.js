const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const config = require('./config')

mongoose.connect('mongodb+srv://ryan:contactmanagerpw@contact-manager-ptzoy.mongodb.net/test?retryWrites=true&w=majority',{
  useNewUrlParser: true
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

module.exports = app