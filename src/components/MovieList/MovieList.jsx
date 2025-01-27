import React, {Component} from 'react';
import {connect} from 'react-redux';

class MovieList extends Component {
    // Runs getMovies on page load
    componentDidMount() {
        this.getMovies();
    }

    // Asks saga to get data from the database
    getMovies = () => {
        this.props.dispatch({
            type: 'GET_MOVIES',
        })
    }

    handleClick = (id) => {
        this.props.dispatch({
            type: 'GET_DETAILS',
            payload: id
        })
        console.log(id);
        this.props.history.push('/details')
    }

    // Renders all the movies in the database to the DOM
    render() {
        return (
            <div className="App">
                {this.props.reduxStore.movies.map(movie => {
                    return (
                        <div key={movie.id}>
                            <h2>{movie.title}</h2>
                            <img src={movie.poster} alt="movie poster" onClick={() => this.handleClick(movie.id)}/>
                            <p>{movie.description}</p>
                        </div>
                    )
                })}
            </div>
        );
    }
}

// Saves all the movies in the database here
const mapStateToProps = reduxStore => {
    return {
        reduxStore
    };
};

export default connect(mapStateToProps)(MovieList);