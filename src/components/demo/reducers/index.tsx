// import all reducers here

import yearBackReducer from "./years";
import topChoiceName from "./choicename";
import displayGraph from "./displaygraphs"
import displayChart from "./displaychart"

import {combineReducers} from 'redux';

const allReducers = combineReducers({
    yearBack : yearBackReducer,
    choiceName : topChoiceName,
    displayDetails : displayGraph,
    displayCharts : displayChart
});

export default allReducers;