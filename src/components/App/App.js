import React, { Component } from 'react';
import './App.css';
import MovieList from '../MovieList/MovieList';
import Details from '../Details/Details';
import {connect} from 'react-redux';
import {HashRouter as Router, Route} from 'react-router-dom';

class App extends Component {
  // Renders the entire app on the DOM
  render() {
    return (
      <Router>
      <div className="App">
          <Route path='/' exact component={MovieList} />
          <Route path='/details' component={Details} />
      </div>
    </Router>
    );

  }
}

const mapStateToProps = reduxStore => {
  return {
    reduxStore
  };
};

export default connect(mapStateToProps)(App);


