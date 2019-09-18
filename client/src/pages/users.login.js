import React, { Component } from 'react';
import { Form, FormControl, FormGroup, FormLabel } from 'react-bootstrap/'
import { Button } from 'react-bootstrap/'
import { Redirect } from 'react-router-dom'

class Login extends Component {
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

  postAndFetchData = (path) => {
    fetch('http://localhost:3000/' + path , {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(this.state)
      })
      .then(console.log(this.state))
      .then((response) => {
        return response.text()
      })
      .then((data) => {
        this.setState({jwt: data.substring(38, data.length - 2)})
        console.log(this.state.jwt)
      })
      .then(() => {this.setRedirect()})
      .catch(() => {
        console.log('didnt post')
      })
  }

  onSubmit = (e) => {
    if(e) {
      console.log("HIT IF")
      e.preventDefault()
    }
    this.postAndFetchData('users/login')
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
              <FormControl type="username" placeholder="username" value={this.state.username} onChange={this.handleUsernameChange} />
            </FormGroup>

            <FormGroup controlId="formBasicPassword">
              <FormLabel>Password</FormLabel>
              <Form.Control type="password" placeholder="password"  value={this.state.password} onChange={this.handlePasswordChange}/>
            </FormGroup>
            <div>
              {this.renderRedirect()}
              <Button variant="primary" onClick={(e) => this.onSubmit()} >
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