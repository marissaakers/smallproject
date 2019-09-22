import React, { Component } from 'react';
import { Form, FormControl, FormGroup, FormLabel } from 'react-bootstrap/'
import { Button } from 'react-bootstrap/'
import { Link, Redirect } from 'react-router-dom'

class AddContact extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      number: '',
      email: '',
      jwt: this.props.location.state.jwt,
      result: '',
      redirect: false,
    }
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleNumberChange = this.handleNumberChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
  }
  handleNameChange = (e) => {
    this.setState({
      name: e.target.value
    })
    console.log(this.state.name)
  }

  handleNumberChange = (e) => {
    this.setState({
      number: e.target.value
    })
    console.log(this.state.number)
  }

  handleEmailChange = (e) => {
    this.setState({
      email: e.target.value
    })
    console.log(this.state.email)
  }

  postAndFetchData = (path) => {
    fetch('http://localhost:3000/' + path , {
      method: "POST",
      headers: {
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + this.state.jwt
      },
      body: JSON.stringify(this.state)
      })
      .then((response) => {
        return response.text()
      })
      .then((data) => {
        console.log('DATA '+ data)
        this.setState({
          showName: true
        })
      })

      .then(() => {
        this.setRedirect()
      })


      .catch(() => {
        console.log('didnt post')
      })
  }

  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to={{
        pathname: '/add-contact-confirmation',
        state: {
          name: this.state.name,
          jwt: this.state.jwt
        }
      }}/>
    }
  }

  onSubmit = (e) => {
    if(e) {
      
      console.log(this.state.showName)
      console.log("HIT IF")
      e.preventDefault()
    }
    this.postAndFetchData('contacts/create-contact')
  }




  render() {
    return(
      <div >
        <h1 style={{margin: '5%'}}>Add Contact</h1>
        <div style={styling.outerDiv}>
          <Form style={styling.formDiv}>
            <FormGroup>
              <FormLabel>Full Name</FormLabel>
              <FormControl type="username" placeholder="full name" value={this.state.name} onChange={this.handleNameChange} />
            </FormGroup>

            <FormGroup>
              <FormLabel>Phone Number</FormLabel>
              <Form.Control placeholder="phone number"  value={this.state.number} onChange={this.handleNumberChange}/>
            </FormGroup>

            <FormGroup>
              <FormLabel>Email Address</FormLabel>
              <Form.Control placeholder="email address"  value={this.state.email} onChange={this.handleEmailChange}/>
            </FormGroup>
            <div>

               {this.renderRedirect()}
              <Button variant="primary" onClick={(e) => this.onSubmit()} >
                Submit
              </Button>
            </div>
            <div>
              <Link to={{
                pathname: '/users/dashboard',
                state: { jwt: this.state.jwt }
              }}><Button style={styling.dash}>Dashboard</Button></Link>
            </div>
          </Form>
        </div>
      </div>
    )
  }
}

const styling = {
  formDiv: {
    width: '50%',
  },
  outerDiv: {
    display: 'flex',
    justifyContent: 'center',
    margin: '8%'
  },
  dash: {
    justifyContent: 'center',
    margin: '15%'


  }
}

export default AddContact;