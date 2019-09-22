import React, { Component } from 'react';
import { Form, FormControl, FormGroup, FormLabel } from 'react-bootstrap/'
import { Button } from 'react-bootstrap/'
import { Link, Redirect } from 'react-router-dom'
import addcontact from './images/addcontact.png'
import submitbutton from './images/submit.png'
import dashbutton from './images/dashboard.png'

console.log(addcontact);
console.log(submitbutton);
console.log(dashbutton);


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
        if(response.status == 200 || response.status == 201) {
          this.setState({
            showName: true
          })
        }
        return response.text()
      })
      .then((data) => {
        console.log('DATA '+ data)
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
      <img src={addcontact} width = "700"/>
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
            <div class= "container">
              <Button variant="link" onClick={(e) => this.onSubmit()} >
                <img src={submitbutton} width = "200"/>
              </Button> </div>
            </div>
            <div>
              <Link to={{
                pathname: '/users/dashboard',
                state: { jwt: this.state.jwt }
              }}> <img src={dashbutton} width = "200"/> </Link>
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
    margin: '-100px'
  },
  outerDiv: {
    display: 'flex',
    justifyContent: 'center',
    margin: '8%'
  },
  dash: {
    justifyContent: 'center',
    margin: '5%'


  }
}

export default AddContact;
