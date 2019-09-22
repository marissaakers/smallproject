# Small Project: Contact Manager Instructions/Guide

## Step 1: Choose Sign-Up or Login

- Upon arrival of the contact manager, you will see two options on the _landing page_ 
  
  Landing page Route: `<Route exact path='/' component={Landing} />`

  1. Sign-Up Button
     
      If the Sign-Up Button is chosen, **the user will be redirected to the _Sign-Up Page_** where they will be asked for
      their username and password. After signing up, the user will then be redirected to the _login page_. 
      
      Sign-Up page Route: `<Route path='/users/signup' component={SignUp} />`
      
  2. Login Button
     
     If the Login Button is chosen, **the user will be redirected to the _Login Page_** and prompted to submit a username and
     password. 
     
     Login page Route: `<Route path='/users/login' component={Login} />`
  
## Step 2: Dashboard Options

- After successfully logging in, **the user will be redirected from the _Login page_ to the _Dashboard page_** where they will be presented
  3 options:
  
  1. Show Contact Button
  2. Add Contact Button
  3. Search Contact Button
  
  Dashboard page Route: `<Route path='/users/dashboard' component={Dashboard} />`

## Step 3: Show Contact

- If the Show Contact Button is chosen from the _Dashboard page_, the user will be redirected to the _Show Contact page_.
  
  Show Contact page Route: `<Route path='/contacts' component={ShowContact} />`
  
  The main function of the _Show Contact page_ is to retrieve all the contacts that the user has added to their contact
  manager. Upon arrival of the page, **the _Show Contact page_ will display all contacts in an unordered list** 
  **featuring - Full Name, Phone Number and Email.**

## Step 4: Add Contact

- If the Add Contact Button is chosen from the _Dashboard page_, the user will be redirected to the _Add Contact page_.
  
  Add Contact page Route: `<Route path='/contacts/create-contact' component={AddContact} />`
  
  The main function of the _Add Contact page_ is to provide the user with an interface to add contacts to their contact
  manager. Upon arrival of the page, **the _Add Contact page_ will provide a form to conveniently fill in information** 
  **regarding the new contact's - Full Name, Phone Number and Email.**
  
  After properly entering the respective information on the _Add Contact page_, the user will then be redirected to the
  _Add Contact Confirmation page_ where a message will be displayed reading whether or not the contact was added.
  
  Add Contact Confirmation page Route: `<Route path='/add-contact-confirmation' component={AddContactConfirmation} />`

## Step 5: Search Contact

- If the Search Button is chosen from the _Dashboard page_, the user will be redirected to the _Search page_.
  
  Search page Route: `<Route path='/contacts/search' component={Search} />`
  
  The main function of the _Search Contact page_ is to provide the user with an interface to search contacts in their contact
  manager. Upon arrival of the page, **the _Search page_ will provide a form to conveniently fill in information** 
  **regarding the contact's - Full Name.**
  
  After properly entering the respective informaion on the _Search page_, the user will be redirected to the _Search Contacts_
  _Results page_ where **the retrieved contacts information will be displayed in an unordered list showing information**
  **regarding the searched contact's - Full Name, Phone Number, and Email.**
  
  Search Contacts Results page: `<Route path='/search-contacts/result' component={SearchContactsResult} />`
  
# Small Project: Contact Manager Information

## Contact API Route Calls

```// Get all users from the data base that are under the user who is currently logged in (done with jsonwebtokens)
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
  Contact.find({name: req.body.searchName})
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
})```

## User API Route Calls

```// Retrieves all users stored in the database
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
})```

## User API Model

```const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    unique: true
  }
})```

## Contact API Model

```const contactSchema = mongoose.Schema({
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
})```
