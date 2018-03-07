import React, { Component } from 'react';


import WeatherIcon from './WeatherIcon.jsx'
import { Row } from 'reactstrap';
class WeatherForecast extends Component{
  constructor(props){
    super(props)
    this.state = {forecast: null}
  }
  componentWillMount(){
    if (this.state.forecast === null){
      //fetch the weather

      const url =
        'http://api.wunderground.com/api/25b9c613e3c6295c/forecast10day/q/' +
          this.props.state + '/' + this.props.city.replace(' ', '_') + ".json"
      fetch(url)
        .then(rsp => rsp.json())
        .then(forecast => {
          console.log('got forecast', forecast)
          this.setState({forecast: forecast})
        })
        .catch(err=> console.log("ERR",err))
    }
  }
  render(){

    var weather = ""
    if (this.state.forecast){
      weather = this.state.forecast.forecast.simpleforecast.forecastday
        .map(w => <WeatherIcon w={w} key={w.date.epoch}/>)
    }
    return  <div>
              <h2>Weather for {this.props.city}, {this.props.state}</h2>
              <Row className="mx-auto">
                {weather}
              </Row>
            </div>
  }

}

export default WeatherForecast
