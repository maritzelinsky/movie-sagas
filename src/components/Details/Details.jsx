import React, {Component} from 'react';
import {connect} from 'react-redux';

class Details extends Component {
    handleClickHome = () => {
        this.props.history.push('/');
    }

    handleClickEdit = () => {
        this.props.history.push('/edit');
    }

    render() {
        return (
            <div>
                <h2>{this.props.reduxStore.details.title}</h2>
                <img src={this.props.reduxStore.details.poster} alt="movie poster" />
                <h5>{this.props.reduxStore.details.movie_genre} </h5>
                <p>{this.props.reduxStore.details.description}</p>
                <button onClick={this.handleClickHome}>Back to List</button>
                <button onClick={this.handleClickEdit}>Edit</button>
            </div>
            )
        
        }
    }

// Saves everything in the database
const mapStateToProps = reduxStore => {
    return {
        reduxStore
    };
};

export default connect(mapStateToProps)(Details);