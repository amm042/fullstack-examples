import React, { Component } from 'react';

import WeatherIcon from './WeatherIcon.jsx'
import { Row, Breadcrumb, BreadcrumbItem } from 'reactstrap';

import { Link } from 'react-router-dom'

class WeatherForecast extends Component{
  constructor(props){
    super(props)
    console.log('forecast ctor', props)
    this.state = {
      forecast: null,
      city: this.props.match.params.city,
      state: this.props.match.params.state
    }
  }
  componentWillMount(){
    if (this.state.forecast === null){
      //fetch the weather

      const url =
        'http://api.wunderground.com/api/25b9c613e3c6295c/forecast10day/q/' +
          this.state.state + '/' + this.state.city.replace(' ', '_') + ".json"
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
              <Breadcrumb>
                <BreadcrumbItem><Link to="/">Home</Link></BreadcrumbItem>
                <BreadcrumbItem><Link to={"/"+this.state.state}>{this.state.state}</Link></BreadcrumbItem>
                <BreadcrumbItem active><Link to={"/"+this.state.state+"/"+this.state.city}>{this.state.city}</Link></BreadcrumbItem>
              </Breadcrumb>
              <h2>Weather for {this.state.city}, {this.state.state}</h2>
              <Row className="mx-auto">
                {weather}
              </Row>
            </div>
  }

}

export default WeatherForecast
