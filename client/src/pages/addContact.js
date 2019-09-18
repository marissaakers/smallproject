import React, { Component } from 'react';
import { Form, FormControl, FormGroup, FormLabel } from 'react-bootstrap/'
import { Button } from 'react-bootstrap/'
import { Redirect } from 'react-router-dom'

class Login extends Component {
  constructor(props) {
    super(props)
    console.log(this.props.location.state.jwt)
    this.state = {
      name: '',
      number: '',
      email: '',
      jwt: this.props.location.state.jwt,
      result: '',
      redirect: false
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
        this.setState({jwt: data.substring(38, data.length - 2)})
        console.log(this.state.jwt)
      })
      //.then(() => {this.setRedirect()})
      .catch(() => {
        console.log('didnt post')
      })
  }

  onSubmit = (e) => {
    if(e) {
      console.log("HIT IF")
      e.preventDefault()
    }
    this.postAndFetchData('contacts/create-contact')
  }

  // setRedirect = () => {
  //   this.setState({
  //     redirect: true
  //   })
  // }
  // renderRedirect = () => {
  //   if (this.state.redirect) {
  //     //console.log('THE STATE: ' + this.state.jwt)
  //     return <Redirect to={{
  //       pathname: '/users/dashboard', 
  //       state: { jwt: this.state.jwt }
  //     }}/>
  //   }
  // }

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
              <Form.Control type="password" placeholder="phone number"  value={this.state.number} onChange={this.handleNumberChange}/>
            </FormGroup>

            <FormGroup>
              <FormLabel>Email Address</FormLabel>
              <Form.Control type="password" placeholder="email address"  value={this.state.email} onChange={this.handleEmailChange}/>
            </FormGroup>
            <div>
              {/* {this.renderRedirect()} */}
              <Button variant="primary" onClick={(e) => this.onSubmit()} >
                Submit
              </Button>
              <p>{this.state.result.name + ' created...'}</p>
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
  }
}

export default Login;