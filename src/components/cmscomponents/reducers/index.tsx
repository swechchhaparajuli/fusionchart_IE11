// import all reducers here

import yearBackReducer from "./filtertopfifteen";
import topChoiceName from "./choicename";
import timeChoiceName from "./timeinterval";
import displayGraph from "./displaygraphs"
import displayChart from "./displaychart"

import {combineReducers} from 'redux';


const allReducers = combineReducers({
    yearBack : yearBackReducer,
    topChoice : topChoiceName,
    timeChoice : timeChoiceName,
    displayDetails : displayGraph,
    displayCharts : displayChart,
})

export default allReducers;