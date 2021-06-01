import React, {FC} from "react";
import { useState } from "react";

import ReactFC from "react-fusioncharts";

import 'jquery-fusioncharts';
import $ from 'jquery';

import FakeData from './api/WHOAPI'
import FakeDataD from './api/WHODAPI'

import "./styles.scss";
import CountryConfigs from "../src/components/charts/CountryConfigs"
import ContinentConfigs from "../src/components/charts/ContinentConfigs"
import "./api/WHOAPI"

$(document).on("click", "#fill-day",function(){
    var arr = FakeData[0].id + " " + FakeData[0].value;
    for(let i = 1; i < FakeData.length; i++){
        arr = arr + " | " + FakeData[i].id + " " + FakeData[i].value + " | ";
    }
    CountryConfigs.dataSource.data = FakeData;
});


$(document).on("click", "#fill-month",function(){
    CountryConfigs.dataSource.data = FakeDataD;
});



const App: FC = () => {
    const env = process.env.NODE_ENV;

    const [, updateDay] = React.useState(0);
    const [, updateMonth] = React.useState(0);

    return(
        <div>
            <h1>{env}</h1>
            <ReactFC {...CountryConfigs} />
            <button onClick={updateDay} id="fill-day"> Vaccinations Per Day </button>
            <button onClick={updateMonth} id="fill-month"> Vaccinations Per Month </button>
            <ReactFC {...ContinentConfigs} id="chart-container"/>
            
        </div>
    )
}

export default App;