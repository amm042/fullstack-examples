import React, { Component } from 'react';


import './App.css';
import WeatherForecast from './WeatherForecast'
import { Container } from 'reactstrap';

// 
// class WeatherRoot extends Component{
//   render(){
//     return "weather root."
//   }
// }

class App extends Component {
  render() {
    return (
      <Container fluid={true}>

        <WeatherForecast state={this.props.state} city={this.props.city}/>
      </Container>
    );
  }
}

export default App;
