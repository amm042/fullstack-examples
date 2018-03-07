import React, { Component } from 'react';

import { Card, CardBody, CardImg, CardText, CardTitle,CardSubtitle } from 'reactstrap'

class WeatherIcon extends Component{
  render(){
    return (
    // <Col lg="auto" md="2" sm="4" xs="6">
    //   <p>{this.props.w.date.pretty.split('on')[1].trim()}</p>
    //   <img src={this.props.w.icon_url} alt={this.props.w.icon}/>
    //   <p>{this.props.w.conditions}</p>
    //   <p>High: {this.props.w.high.fahrenheit}</p>
    //   <p>Low: {this.props.w.low.fahrenheit}</p>
    // </Col>
      <Card>
        <CardImg top src={this.props.w.icon_url} />
        <CardBody>
          <CardTitle>{this.props.w.date.pretty.split('on')[1].trim()}</CardTitle>
          <CardSubtitle>{this.props.w.conditions}</CardSubtitle>
            <CardText>
              High: {this.props.w.high.fahrenheit}<br/>
              Low: {this.props.w.low.fahrenheit}
            </CardText>

        </CardBody>
      </Card>
    )
  }
}


export default WeatherIcon
