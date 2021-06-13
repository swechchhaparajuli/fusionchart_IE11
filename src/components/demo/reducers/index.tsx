// import all reducers here

import yearBackReducer from "./years";
import topCountReducer from "./topcount";
import {combineReducers} from 'redux';

const allReducers = combineReducers({
    yearBack : yearBackReducer,
    topCount : topCountReducer
});

export default allReducers;