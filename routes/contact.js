const express = require('express')
const router = express()
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const Contact = require('../models/contactModel')

// Get all users from the data base that are under the user who is currently logged in (done with jsonwebtokens)
router.get('/', function(req, res) {
  const decoded = jwt.decode(req.headers.authorization.split(" ")[1])

  Contact.find({owner: decoded.userId})
  .populate('owner', 'username')
  .exec()
  .then(contacts => {
    res.status(200).json(contacts)
  })
  .catch(err => {
    res.status(500).json(err)
  })
})

// Search for one contact in specific based off the contact name provided
router.get('/search', function(req, res) {
  Contact.findOne({name: req.body.searchName})
  .exec()
  .then(contact => {
    res.status(200).json(contact)
  })
  .catch(err => {
    res.status(500).json(err)
  })
})

// Create a contact with owner information being passed by the jwt, post to database
router.post('/create-contact', function(req, res) {
  const decoded = jwt.decode(req.headers.authorization.split(" ")[1])

  const contact = new Contact({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    number: req.body.number,
    email: req.body.email,
    owner: decoded.userId
  })

  Contact.create(contact, (err, contact) => {
    if(err) {
      res.status(500).json(err)
    } else {
      res.status(201).json(contact)
    }
  })
})

// Find and delete contact with id given by the url
router.delete('/:id', function(req, res) {
  Contact.findByIdAndDelete(req.params.id)
  .exec()
  .then(() => {
    res.status(200).json({
      message: 'Contact deleted.'
    })
  })
  .catch(err => {
    res.status(500).json({
      message: err
    })
  })
})

module.exports = router