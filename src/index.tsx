import "core-js/stable";
import React from "react";

import ReactDOM from "react-dom";
import App from './App'
import {createStore , applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk'

import allReducers from "./components/demo/reducers";
import { filterTopCount } from "./components/demo/actions/filterTop15";
import { filterTime } from "./components/demo/actions/filterTime"
import {Provider} from 'react-redux';

//const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))

let store = createStore(allReducers, 
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );

//console.log(store.getState());


ReactDOM.render(
    <Provider store={store}>
    <App />,
    </Provider>, 
    document.getElementById("root")
);
