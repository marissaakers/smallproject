import React, { Component } from 'react';
import { Form, FormControl, FormGroup, FormLabel } from 'react-bootstrap/'
import { Button } from 'react-bootstrap/'
import { Redirect } from 'react-router-dom'

class Login extends Component {
  componentWillMount() {
    console.log('mounted bih')
  }
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      jwt: '',
      redirect: false
    }
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
  }
  handleUsernameChange = (e) => {
    this.setState({
      username: e.target.value
    })
    console.log(this.state.username)
  }

  handlePasswordChange = (e) => {
    this.setState({
      password: e.target.value
    })
    console.log(this.state.password)
  }

  onSubmit = (e) => {
    fetch('http://localhost:3000/users/login' , {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(this.state)
      })
      .then((result) => {
        result.json()
        JSON.stringify(result)
        this.setState({jwt: result.token})
      })
      .then(() => {this.setRedirect()})
    } 

  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/dashboard' />
    }
  }

  render() {
    return(
      <div >
        <h1 style={{margin: '5%'}}>Login</h1>
        <div style={styling.outerDiv}>
        <Form style={styling.formDiv}>
          <FormGroup>
            <FormLabel>Username</FormLabel>
            <FormControl type="username" placeholder="username" />
          </FormGroup>

          <FormGroup controlId="formBasicPassword">
            <FormLabel>Password</FormLabel>
            <Form.Control type="password" placeholder="password" />
          </FormGroup>
          <div>
            {this.renderRedirect()}
            <Button variant="primary" onClick={this.onSubmit()} >
              Submit
            </Button>
            <p>{this.state.jwt}</p>
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