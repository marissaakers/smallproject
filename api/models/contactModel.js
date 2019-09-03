const mongoose = require('mongoose')

const contactSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
    unique: false
  },
  number: {
    type: Number,
    required: true,
    unique: false
  },
  email: {
    type: String,
    required: true,
    unique: false
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: false
  }
})

module.exports = mongoose.model('Contact', contactSchema)