import React, { Component } from 'react';


import './App.css';
import WeatherForecast from './WeatherForecast'


class App extends Component {
  render() {
    return (
      <WeatherForecast state="PA" city="Lewisburg"/>
    );
  }
}

export default App;
