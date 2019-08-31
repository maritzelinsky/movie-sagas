import React, {Component} from 'react';
import {connect} from 'react-redux';

class Details extends Component {
    render() {
        return (
            <div>
                <h2>{this.props.reduxStore.details.title}</h2>
                <img src={this.props.reduxStore.details.poster} alt="movie poster" />
                <p>{this.props.reduxStore.details.description}</p>
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