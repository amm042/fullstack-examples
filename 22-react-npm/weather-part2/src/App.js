import React, { Component } from 'react';


import './App.css';
import WeatherForecast from './WeatherForecast'
import { Container } from 'reactstrap';

class App extends Component {
  render() {
    return (
      <Container fluid={true}>

        <WeatherForecast state="PA" city="Lewisburg"/>

      </Container>
    );
  }
}

export default App;
