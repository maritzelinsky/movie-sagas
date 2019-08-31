import React, { Component } from 'react';
import './App.css';
import MovieList from '../MovieList/MovieList';
import {connect} from 'react-redux';

class App extends Component {
  // Renders the entire app on the DOM
  render() {
    return (
      <div className="App">
        <MovieList />
      </div>
    );
  }
}

const mapStateToProps = reduxStore => {
  return {
    reduxStore
  };
};

export default connect(mapStateToProps)(App);


