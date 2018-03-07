import React, { Component } from 'react';



class WeatherIcon extends Component{
  render(){
    return (
    <div>
      <p>{this.props.w.date.pretty}</p>
      <img src={this.props.w.icon_url} alt={this.props.w.icon}/>
      <p>{this.props.w.conditions}</p>
      <p>High: {this.props.w.high.fahrenheit}</p>
      <p>Low: {this.props.w.low.fahrenheit}</p>
    </div>
    )
  }
}


export default WeatherIcon
