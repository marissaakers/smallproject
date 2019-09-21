const jwt = require('jsonwebtoken')

// Exports a function that will verify the jwt being passed and return the parsed data
module.exports = (req, res, next) => {
  try{
    const decoded = jwt.verify(req.headers.authorization.split(" ")[1], 'contactmanagerpw')
    req.userData = decoded
    next()
  } catch(error) {
    res.status(401).json({
      message: "Auth failed."
    })
  }
}