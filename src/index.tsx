import "core-js/stable";
import React from "react";
import ReactDOM from "react-dom";
import "./styles.scss";
import App from './App'
import {createStore} from 'redux';
import allReducers from "./components/demo/reducers";
import { filterTopCount } from "./components/demo/actions/filterTop15";
import { filterTime } from "./components/demo/actions/filterTime"
import {Provider} from 'react-redux';


let store = createStore(allReducers, 
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );


ReactDOM.render(
    <Provider store={store}>
    <App />
    </Provider>, 
    document.getElementById("root")
);
