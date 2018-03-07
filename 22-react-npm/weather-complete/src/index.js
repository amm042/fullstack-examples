import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import registerServiceWorker from './registerServiceWorker';

import 'bootstrap/dist/css/bootstrap.css';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import WeatherForecast from './WeatherForecast.jsx'

class StateList extends React.Component{
  render(){
    const states = ['PA', 'CA']
    return (
      <div>
        <Breadcrumb>
          <BreadcrumbItem><Link to="/">Home</Link></BreadcrumbItem>
        </Breadcrumb>
        <ul>{states.map(s=><li key={s}><Link to={s}>{s}</Link></li>)}</ul>
      </div>
   )
  }
}

class CityList extends React.Component{
  render(){
    const cities = {'PA':['Lewisburg','Philadelphia'],
      'CA': ['San Francisco', 'Sacramento']}
    return (
      <div>
        <Breadcrumb>
          <BreadcrumbItem><Link to="/">Home</Link></BreadcrumbItem>
          <BreadcrumbItem active>
            <Link to={this.props.match.params.state}>
              {this.props.match.params.state}
            </Link>
          </BreadcrumbItem>
        </Breadcrumb>
        <ul>{cities[this.props.match.params.state]
            .map(s=><li key={s}><Link to={this.props.match.params.state+'/'+s}>{s}</Link></li>)}</ul>
      </div>
    )
  }
}

//ReactDOM.render(<App />, document.getElementById('root'));

ReactDOM.render((
  <Router>
    <div>
      <Route exact path="/" component={StateList}/>
      <Route exact path="/:state" component={CityList}/>
      <Route exact path="/:state/:city" component={WeatherForecast}/>
    </div>
  </Router>

  ), document.getElementById('root')
)
registerServiceWorker();
