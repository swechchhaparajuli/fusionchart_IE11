import React, { Component } from 'react';
import {useState} from 'react';
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts"
import charts from 'fusioncharts/fusioncharts.charts';


import UmberTheme from "fusioncharts/themes/fusioncharts.theme.umber";
import CandyTheme from "fusioncharts/themes/fusioncharts.theme.candy"

import FusionMaps from 'fusioncharts/fusioncharts.maps';
import USA from 'fusioncharts/maps/fusioncharts.usa';
import Europe from 'fusionmaps/maps/fusioncharts.europe';

import EuroData from '../../api/eurodata';

import MapConfig from './MapConfig';
import CountryConfigs from './CountryConfigs';
import ContinentConfigs from './ContinentConfigs';
import EuroChart from './EuroChart';

charts(FusionCharts);
ReactFC.fcRoot( Europe, USA, FusionMaps, CandyTheme, UmberTheme);

const mapSetup = {
    chart: {
      caption: "Sales of Cigarettes in Europe",
      subcaption: "(per adult per day)",
      legendposition: "BOTTOM",
      entitytooltext: "$lname: <b>$datavalue </b>cigarettes",
      legendcaption: "Number of cigarettes smoked per adult per day",
      entityfillhovercolor: "#FFCDD2",
      theme: "candy"
    },
    colorrange: {
      gradient: "0",
      color: [
        {
          maxvalue: "400",
          displayvalue: "2-400",
          code: "#EF9A9A"
        },
        {
          maxvalue: "60000",
          displayvalue: "40-60000",
          code: "#EF5350"
        },
        {
          maxvalue: "8000000",
          displayvalue: "600000-8000000",
          code: "#E53935"
        },
        {
          maxvalue: "10000000",
          displayvalue: "8000000-100000000",
          code: "#C62828"
        },
        {
          maxvalue: "0",
          displayvalue: "No data available",
          code: "#FFEBEE"
        }
      ]
    },
    data: EuroData
  };


var changeLabel = (val: string) =>{
    var config = {
    chart : {
        caption: "Vaccines Per " + val,
        theme: "candy",
        legendposition: "BOTTOM",
        entitytooltext: "$lname: <b>$datavalue </b> vaccines",
        legendcaption: "Vaccines Per " + val,
        entityfillhovercolor: " Vaccines"
    }
    };
    return config;
}


class MyMaps extends Component <{mtype: string}>{

    state = {
        type:this.props.mtype,
        width:"100%",
        dataFormat:"JSON",
        datasource: mapSetup
    }

    changeLabel = (val:string) =>{
        this.setState({
            chart:{
                caption: "Vaccines Per " + val,
                theme: mapSetup.chart.theme,
                legendposition: mapSetup.chart.legendposition,
                entitytooltext: mapSetup.chart.entitytooltext,
                legendcaption: "Vaccines Per " + val,
                entityfillhovercolor: mapSetup.chart.entityfillhovercolor
            }
        });
    }   

    render() {
    return(
        <div>
            <button onClick={() => {this.changeLabel("Day")}}> Day Data </button>
            <button onClick={() => {this.changeLabel("Month")}}> Month Data </button>
            <button onClick={() => {this.changeLabel("Year")}}> Year Data </button>
            {/* <MapConfig mtype={this.state}/> */}
            <EuroChart dtype={this.state.datasource}/>
            <CountryConfigs dtype={this.state.datasource}/>
            <ContinentConfigs dtype={this.state.datasource}/>
        </div>
    );
    }
    
}
export default MyMaps;