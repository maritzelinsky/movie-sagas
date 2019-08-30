import React, { Component } from 'react';
import './App.css';
import {connect} from 'react-redux';

class App extends Component {
  // Renders the entire app on the DOM
  componentDidMount() {
    this.getMovies();
  }

  getMovies = () => {
    this.props.dispatch({
      type: 'GET_MOVIES',
    })
  }


  render() {
    return (
      <div className="App">
        {this.props.reduxStore.movies.map(movie => {
          return (
            <div>
              <h2>{movie.title}</h2>
              <img src={movie.poster} />
              <p>{movie.description}</p>
            </div>
          )
        })}
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
