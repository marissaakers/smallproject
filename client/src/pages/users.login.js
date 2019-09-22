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
      redirect: false,
      result: ''
    }
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
  }

  componentDidMount() {
    this.mounted = true
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
      .then((response) => {
        console.log(response.status)
        if(response.status == 200 || response.status == 201) {
          return response.text()
        } else if (response.status == 401 || response.status == 400 || response.status == 500 && this.mounted == true) {
          this.setState({
            redirect: false,
            result: 'Username or password incorrect.'
          })
          return
        }
      })
      .then((data) => {
        let res = JSON.parse(data)
        res = res.token
        if(this.mounted == true) {
          this.setState({
            jwt: res
          })
        }
        console.log(this.state.jwt)
      })
      .then(() => {this.setRedirect()})
      .catch(() => {
        console.log('didnt post')
      })
  }

  onSubmit = (e) => {
    this.postAndFetchData('users/login')
  }

  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }
  renderRedirect = () => {
    if (this.state.redirect) {
      //console.log('THE STATE: ' + this.state.jwt)
      return <Redirect to={{
        pathname: '/users/dashboard', 
        state: { jwt: this.state.jwt }
      }}/>
    }
  }

  componentWillUnmount() {
    this.mounted = false
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
            <p>{this.state.result}</p>
            <div>
              {this.renderRedirect()}
              <Button variant="primary" onClick={(e) => this.onSubmit()} >
                Submit
              </Button>
              <p>{this.state.result}</p>
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