const express = require('express')
const router = express()
const mongoose = require('mongoose')

const Contact = require('../models/contactModel')
const auth = require('../middleware/authorize')

// Get all users from the data base that are under the user who is currently logged in (done with jsonwebtokens)
router.get('/', auth, function(req, res) {
  console.log(req.userData)
  Contact.find({owner: req.userData.userId})
  .populate('owner', 'username')
  .exec()
  .then(contacts => {
    res.status(200).json({contacts: contacts})
  })
  .catch(err => {
    res.status(500).json(err)
  })
})

// Search for one contact in specific based off the contact name provided
router.post('/search', auth, function(req, res) {
  Contact.find({
    name: req.body.searchName,
    owner: req.userData.userId
  })
  .exec()
  .then(contact => {
    res.status(200).json({contacts: contact})
  })
  .catch(err => {
    res.status(500).json(err)
  })
})

// Create a contact with owner information being passed by the jwt, post to database
router.post('/create-contact', auth, function(req, res) {
  const contact = new Contact({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    number: req.body.number,
    email: req.body.email,
    owner: req.userData.userId
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
router.delete('/:id', auth, function(req, res) {
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