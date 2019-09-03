import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import {takeEvery, put} from 'redux-saga/effects';
import axios from 'axios';

// Sends all the movie information to the movies reducer
function* getMoviesSaga() {
    try {
        let response = yield axios.get('/movies')
        console.log('In getMovies saga:', response.data)
        yield put ({
            type: 'SET_MOVIES',
            payload: response.data
        })
    } catch (error) {
        console.log('Error in getMovies saga:', error);
    }
}

// Sends the selected movie details to the details reducer
function* getDetailsSaga(action) {
    try {
        console.log('in get details saga', action.payload)
        let response = yield axios.get(`/movies/details/${action.payload}`)
        console.log('In getDetailsSaga:', response.data)
        yield put ({
            type: 'SET_DETAILS',
            payload: response.data
        })
    } catch (error) {
        console.log('Error in getDetails saga:', error)
    }
}

function* editDetailsSaga(action) {
    try {
        yield axios.put(`/details/`, action.payload);
        yield put({
            type: 'SET_DETAILS',
            payload: action.payload.id
        })
    } catch (error) {
        console.log('Error in POST', error);
    }
}

// Create the rootSaga generator function
function* rootSaga() {
    yield takeEvery('GET_MOVIES', getMoviesSaga)
    yield takeEvery('GET_DETAILS', getDetailsSaga)
    yield takeEvery('EDIT_DETAILS', editDetailsSaga)
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store movies returned from the server
const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
}

// Used to store the selected movie returned from the server
const details = (state = [], action) => {
    switch (action.type) {
        case 'SET_DETAILS':
            return action.payload;
        default:
            return state;
    }
}

// Used to store the movie genres
const genres = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES':
            return action.payload;
        default:
            return state;
    }
}

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movies,
        details,
        genres,
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(<Provider store={storeInstance}><App /></Provider>, 
    document.getElementById('root'));
registerServiceWorker();
