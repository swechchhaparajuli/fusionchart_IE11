import React, { Component } from 'react';
import ReactFC from "react-fusioncharts";
import CountryConfigs from './CountryConfigs'
import ContinentConfigs from './ContinentConfigs'



class MyCharts extends Component {
    render(){
    return(
        <div>
            <ReactFC {...CountryConfigs} />
            <ReactFC {...ContinentConfigs} />
        </div>
    );
    }
}
export default MyCharts;