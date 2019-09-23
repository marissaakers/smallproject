const express = require('express')
const router = express()

const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/userModel')

// Retrieves all users stored in the database
router.get('/', function(req, res) {
  User.find()
  .exec()
  .then(users => {
    res.status(200).json(users)
  })
  .catch(err => {
    res.status(500).json(err)
  })
})

// Encrypts the password given by the user, if succesfully encrypted creates a new user object and stores in the database
router.post('/signup', function(req, res) {
  bcrypt.hash(req.body.password, 10, (err, encryption) => {
    if(err) {
      res.status(500).json(err)
    } else {
      const user = new User({
        _id: new mongoose.Types.ObjectId(),
        username: req.body.username,
        password: encryption
      })

      User.create(user, (err, user) => {
        if(err) {
          res.status(500).json(err)
        } else {
          console.log(user)
          res.status(201).json({message: `user ${user.username} created.`})
        }
      })
    }
  })
})

/* Finds user by username, compares password provided to the encrypted password stored in the database,
   if they match up, creates a webtoken that will be authenticated and will allow the user access to certain information
   within the application
*/
router.post('/login', function(req, res) {
  User.findOne({username: req.body.username})
  .exec()
  .then(user => {
    bcrypt.compare(req.body.password, user.password, (err, same) => {
      if(err) {
        res.status(401).json({
          message: 'Auth failed.'
        })
      } else if(same) {
        const token = jwt.sign({
          userId: user.id,
          username: user.username
        },
        'contactmanagerpw',
        {
          expiresIn: '1h'
        })

        res.status(200).json({
          message: 'Auth successul.',
          token: token
        })
      } else {
        res.status(401).json({
          message: 'Auth failed.'
        })
      }
    })
  })
  .catch(() => {
    res.status(401).json({
      message: 'Auth failed.'
    })
  })
})

// Deletes user based off id provided in url
router.delete('/:id', function(req, res) {
  User.findByIdAndDelete({_id: req.params.id})
  .exec()
  .then(() => {
    res.status(200).json({
      message: 'User deleted.'
    })
  })
  .catch(err => {
      res.status(500).json(err)
  })
})

module.exports = router