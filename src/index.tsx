import "core-js/stable";
import React from "react";

import ReactDOM from "react-dom";
import App from './App'
import {createStore , applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk'

import allReducers from "./components/cmscomponents/reducers";
import { filterTopCount } from "./components/cmscomponents/actions/filterTop15";
import { filterTime } from "./components/cmscomponents/actions/filterTime"
import {Provider} from 'react-redux';
import {useSelector, useDispatch} from 'react-redux';
import {filterAll} from './components/cmscomponents/actions/setFilter'

//const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))

let store = createStore(allReducers, 
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );


    

const callAPI = (count:number, time:number) =>{
    fetch("http://localhost:3000/CMSRoutes")
        .then(res => res.text())
        .then(res => 
            {
            store.dispatch(filterAll(res,count,time));
              //console.log(dataSource);
        });
}

callAPI(10,1);



//console.log(store.getState());


ReactDOM.render(
    <Provider store={store}>
    <App />,
    </Provider>, 
    document.getElementById("root")
);
