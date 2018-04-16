import React, { Component } from 'react';

import { Container, Navbar, NavItem, NavbarBrand, Nav, Button,
  Col, Row } from 'reactstrap'
import Splash from './splash.js';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

//const Icons = require('react-icons/lib/md')
//import Icons from 'react-icons/lib/md'
import * as Icons from 'react-icons/lib/md';

// create a unquie app for your client at https://console.cloud.google.com/apis/
const CLIENT_ID = '939123929106-brcgf18dm3vgu39qe8fml43rc0rs5t7q.apps.googleusercontent.com'
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
        googleUser: null,
        serverSession: {}
      }

    this.handleLogin = this.handleLogin.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
    this.refreshSession = this.refreshSession.bind(this)
  }
  refreshSession(){
    // load the session data.
    // pass credentials: 'include' to enable cookies!
    fetch(backendUrl+'/', {credentials: 'include'})
      .then(resp => resp.json())
      .then(resp => {
        console.log("got api root: ", resp)
        this.setState({serverSession: resp.session})
      })
      .catch(err=>console.log("ERROR:", err))

  }
  componentDidMount(){
      this.refreshSession()
      // check if the user is currently logged in...
      if (!this.state.isSignedIn) {
        console.log("app mounted, checking signin")

        // this loads teh google api object
        window.gapi.load('auth2', () => {
          // create a new Oauth2.0 ceredential at console.cloud.google.com
          window.gapi.auth2.init({
            client_id: CLIENT_ID,
            fetch_basic_profile: true
          })
          .then((auth2)=>{
              console.log("auth2.init finished.")
              console.log("isSignedIn: " + auth2.isSignedIn.get().toString())

              //store this auth2 function on the window object
              //maybe better store in react state... not sure.
              window.gapi.auth2 = auth2

              // we can finally ask google if the user is currently signed in
              // or not
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
    // store the user in the component state
    this.setState({googleUser: gUser, isSignedIn:true})

    //send user to backend!
    //https://developers.google.com/identity/sign-in/web/backend-auth
    let token = gUser.getAuthResponse().id_token
    let body = JSON.stringify({token:token})
    console.log("send to backend", body)
    fetch(backendUrl+'/login', {
      credentials: 'include',
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: body
    })
    .then(rsp => rsp.json())
    .then(rsp => {
      // hopefully everything worked.
      console.log("server login response was", rsp)
      // reget session data from the server (just for demo)
      this.refreshSession()
    })
    .catch(err => {
      console.log("LOGIN FAILED:", err)
    })
  }
  handleLogout(){
    // user cliked the logout button, log them out in the browser
    // and also tell the backend they logged out.
    console.log("got singout click")
    window.gapi.auth2.signOut()
      .then(()=>{
        console.log("signed out!")

        // assume the current user is stored in the backed's session data
        // so we don't have to explicitly add the user to the request
        // (its sent in the cookie)
        fetch(backendUrl+'/logout', {
          credentials: 'include',
          method: 'POST',
          headers: {'Content-Type': 'application/json'}
        })
        .then(rsp => rsp.json())
        .then(rsp => {
          console.log("server logut response was", rsp)
          this.setState({ googleUser:null, isSignedIn: false})
          this.refreshSession()
        })
        .catch(err => {
          console.log("LOGOUT FAILED:", err)
        })
      })
  }

  obj_to_list(o){
    // recursive object dump
    if (o === null)
      return "null"
    if (typeof o !== 'object')
      return o.toString()
    let dump = Object.keys(o).map(
      k => {
        return <li key={k}>{k}: {this.obj_to_list(o[k])}</li>
      }
    )
    return <ul>{dump}</ul>
  }
  render() {
    // if we have a logged in user profile, show the name and icon
    let profile = (this.state.googleUser) ?
      this.state.googleUser.getBasicProfile() :
      null
    let pimg = (profile) ? <img src={profile.getImageUrl()} alt='you'/> : ""
    let pname = (profile)? <p>Hello {profile.getName()}</p>: <p>Please sign in</p>

    // dump the session data to a list to display to the user
    let session_dump = this.obj_to_list(this.state.serverSession)

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
        <Row><hr/></Row>
        <Row>
          <Col>
            <h4>Session dump ({Object.keys(this.state.serverSession).length} items)
              <Button
                color="primary"
                onClick={this.refreshSession}>
              <Icons.MdRefresh/></Button>
            </h4>
            {session_dump}
          </Col>
        </Row>
        <Row><hr/></Row>
        <Row>
          <Col>
            <p>... your website content here ... </p>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
