import React, {Component} from 'react';
import {connect} from 'react-redux';

class Edit extends Component {
    state = {
        title: '',
        description: ''
    }

    handleCancel = () => {
        this.props.history.push('/details')
    }

    handleSave = (id) => {
        this.props.dispatch({
            type: 'EDIT_DETAILS',
            payload: id
        })
        this.props.history.push('/details')
    }

    render () {
        return (
            <div>
                <p>Edit Title:<input /></p>
                <p>Edit Despription: <textarea>{this.props.reduxStore.details.description}</textarea></p>
                <button onClick={this.handleCancel}>Cancel</button>
                <button onClick={this.handleSave}>Save</button>
            </div>
        )
    }
}

const mapStateToProps = reduxStore => {
    return {
        reduxStore
    };
};

export default connect(mapStateToProps)(Edit);