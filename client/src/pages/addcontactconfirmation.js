import React, { Component } from 'react';
import { Form, FormControl, FormGroup, FormLabel } from 'react-bootstrap/'
import { Button } from 'react-bootstrap/'
import { Link, Redirect } from 'react-router-dom'

class AddContactConfirmation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: this.props.location.state.name,
      jwt: this.props.location.state.jwt,
      redirect: false,
      showName: false
    }
    console.log(this.state.name)
  }


  // postAndFetchData = (path) => {
  //   fetch('http://localhost:3000/' + path , {
  //     method: "POST",
  //     headers: {
  //       'Content-type': 'application/json',
  //       'Authorization': 'Bearer ' + this.state.jwt
  //     },
  //     body: JSON.stringify(this.state)
  //     })
  //     .then((response) => {
  //       return response.text()
  //     })
  //     .then((data) => {
  //       console.log('DATA '+data)
  //       this.setState({
  //         showName: true
  //       })

  //       // this.setState({jwt: data.substring(38, data.length - 2)})
  //       // console.log(this.state.jwt)
  //     })
  //     //.then(() => {this.setRedirect()})
  //     .catch(() => {
  //       console.log('didnt post')
  //     })
  // }

  // onSubmit = (e) => {
  //   if(e) {
      
  //     console.log(this.state.showName)
  //     console.log("HIT IF")
  //     e.preventDefault()
  //   }
  //   // this.setState({
  //   //     showName: true
  //   // })
  //   this.postAndFetchData('contacts/create-contact')
  // }


  render() {
    return(
      <div >
        <h1 style={{margin: '5%'}}>Add Contact</h1>
        <div styling={styling.para}>
          <p>{this.state.name + ' created...'}</p>
        </div>
        <div style={styling.outerDiv}>
          <Link to={{
                pathname: '/contacts/create-contact',
                state: { jwt: this.state.jwt }
          }}><Button style={styling.addcontact}>Add Contact</Button></Link>
          <Link to={{
                pathname: '/users/dashboard',
                state: { jwt: this.state.jwt }
          }}><Button style={styling.dash}>Dashboard</Button></Link>
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
  },
  para: {
    justifyContent: 'center',
    margin: '8%'
  },
  addcontact: {
    justifyContent: 'center',
    margin: '15%'
  }
}

export default AddContactConfirmation;