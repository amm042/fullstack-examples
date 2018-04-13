import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import FileList from './FileList.jsx'

import { Container, Row, Col } from 'reactstrap';

/*
 create a sample react app using flex layout that
 has a FileList component

 host is the backend server's address
 bucket is the bucket name to display to the user, it's not
   really used, the backend server forces all access to whatever
   bucket it is configured to use. It would be better to request the
   name of the bucket from the server. But we have better things todo.
 */
class App extends Component {
  render() {
    return (
      <Container>
        <Row>
          <Col>
            <FileList
              host="http://127.0.0.1:9000"
              bucket="labapp-uploads"/>
          </Col>
        </Row>

      </Container>
    );
  }
}

export default App;
