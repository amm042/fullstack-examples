import React, { Component } from 'react';

import { Container, Navbar, NavItem, NavbarBrand, Nav, Button,
  Col, Row } from 'reactstrap'
import Splash from './splash.js';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

//const Icons = require('react-icons/lib/md')
//import Icons from 'react-icons/lib/md'
import * as Icons from 'react-icons/lib/md';

const backendUrl = "http://localhost:4060"

/*
  refs:
    https://developers.google.com/identity/sign-in/web/sign-in

  Note:
    added to index.html!!
    <script src="https://apis.google.com/js/platform.js"></script>
*/
class App extends Component {
  constructor(props){
    super(props)

    this.state = {
        isSignedIn: null,
        googleUser: null
      }

    this.handleLogin = this.handleLogin.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
  }
  componentDidMount(){
      // check if the user is currently logged in...
      if (!this.state.isSignedIn) {
        console.log("app mounted, checking signin")
        window.gapi.load('auth2', () => {
          // create a new Oauth2.0 ceredential at console.cloud.google.com
          window.gapi.auth2.init({
            client_id: '939123929106-brcgf18dm3vgu39qe8fml43rc0rs5t7q.apps.googleusercontent.com',
            fetch_basic_profile: true
          })
          .then((auth2)=>{
              console.log("auth2.init finished.")
              console.log("isSignedIn: " + auth2.isSignedIn.get().toString())

              //store this auth2 function on the window object
              //maybe better store in react state... not sure.
              window.gapi.auth2 = auth2

              if (auth2.isSignedIn.get()){
                // if they are already logged in, pass to the login code.
                let q = auth2.currentUser.get();
                this.handleLogin(q)
              }else{
                // else trigger the login popup
                this.setState({isSignedIn:false})
              }

            })
          .catch((reason)=>{
            console.log("auth2.init failed with: " + reason.error)
            console.log(reason.details)
          })
        })
      }
  }

  handleLogin(gUser){
    this.setState({googleUser: gUser, isSignedIn:true})
    //send user to backend!
    //https://developers.google.com/identity/sign-in/web/backend-auth
    let token = gUser.getAuthResponse().id_token
    let body = JSON.stringify({token:token})
    console.log("send to backend", body)
    fetch(backendUrl+'/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: body
    })
    .then(rsp => rsp.json())
    .then(rsp => {
      console.log("server login response was", rsp)
    })
  }
  handleLogout(){
    console.log("got singout click")
    window.gapi.auth2.signOut()
      .then(()=>{
        console.log("signed out!")
        this.setState({ googleUser:null, isSignedIn: false})
      })
  }
  render() {
    // possible ugly hack to handle when we don't have a valid user.
    let profile = (this.state.googleUser) ?
      this.state.googleUser.getBasicProfile() :
      null
    let pimg = (profile) ? <img src={profile.getImageUrl()} alt='you'/> : ""
    let pname = (profile)? <p>Hello {profile.getName()}</p>: <p>Please sign in</p>

    return (
      <Container>
        <Navbar color="light">
          <NavbarBrand>
            {pimg}
          </NavbarBrand>
          <Nav className='ml-auto' navbar>
            <NavItem>
              {pname}
            </NavItem>
            <NavItem>
              <Button onClick={this.handleLogout}><Icons.MdPowerSettingsNew /></Button>
            </NavItem>
          </Nav>
        </Navbar>
        <Splash
          show={this.state.isSignedIn === false}
          onLogin={this.handleLogin}/>
        <Col>
          <Row><p>... your website content here ... </p></Row>
        </Col>
      </Container>
    );
  }
}

export default App;
