import React, { Component } from 'react';


import FusionCharts from "fusioncharts"
import charts from 'fusioncharts/fusioncharts.charts';
import ReactFC from 'react-fusioncharts';
import chartData from '../../api/mappractice/ContinentData';
import CandyTheme from "fusioncharts/themes/fusioncharts.theme.candy";
import FusionMaps from 'fusioncharts/fusioncharts.maps';
import World from 'fusioncharts/maps/fusioncharts.world';

charts(FusionCharts)
ReactFC.fcRoot(FusionCharts, World, FusionMaps, CandyTheme);

// STEP 3 - Creating the JSON object to store the chart configurations
const dataSource = {
    // Chart Configuration
    chart: {
        caption: "Continent COVID Vaccination",
        theme: "candy",
        legendposition: "BOTTOM",
        entitytooltext: "$lname: <b>$datavalue </b> vaccines",
        legendcaption: "Number of vaccinations per day",
        entityfillhovercolor: "#FFCDD2"
    },
    colorrange: {
        gradient: "0",
        color: [
          {
            maxvalue: "50",
            displayvalue: "0-50",
            code: "#EF9A9A"
          },
          {
            maxvalue: "500",
            displayvalue: "51-500",
            code: "#EF5350"
          },
          {
            maxvalue: "1000",
            displayvalue: "501-1000",
            code: "#E53935"
          },
          {
            maxvalue: "5000",
            displayvalue: "1001-5000",
            code: "#C62828"
          },
          {
            maxvalue: "10000",
            displayvalue: "5000+",
            code: "#FFEBEE"
          }
        ]
    },
    // Chart Data
    data: chartData
};

type DataConfig = {
  chart: {caption: string, 
      theme: string,
      legendposition: string, 
      entitytooltext:string,
      legendcaption:string, 
      entityfillhovercolor:string
  };
}

class ContinentConfigs extends Component <{colors: string, dtype: string}>{
  state = {data: {
    chart: { 
      caption: this.props.dtype,
      theme: this.props.colors,
      legendposition: dataSource.chart.legendposition,
      entitytooltext: dataSource.chart.entitytooltext,
      legendcaption: dataSource.chart.legendcaption,
      entityfillhovercolor: dataSource.chart.entityfillhovercolor
    },
    colorRange: dataSource.colorrange,
    data: chartData
  }
  };

  componentWillReceiveProps = (nextProps) =>{
    this.setState({data : 
     {
       chart: { 
         caption: nextProps.dtype,
         theme: nextProps.colors,
         legendposition: dataSource.chart.legendposition,
         entitytooltext: dataSource.chart.entitytooltext,
         legendcaption: dataSource.chart.legendcaption,
         entityfillhovercolor: dataSource.chart.entityfillhovercolor
       },
       colorRange: dataSource.colorrange,
       data: chartData
     }});
}


  fillDay = () =>{
    this.setState({data : 
      {
        chart: { 
          caption: this.props.dtype,
          theme: this.props.colors,
          legendposition: dataSource.chart.legendposition,
          entitytooltext: dataSource.chart.entitytooltext,
          legendcaption: dataSource.chart.legendcaption,
          entityfillhovercolor: dataSource.chart.entityfillhovercolor
        },
        colorRange: dataSource.colorrange,
        data: chartData
      }});
    }

  fillMonth = () =>{
    this.setState({data : 
      {
        chart: { 
          caption: this.props.dtype,
          theme: this.props.colors,
          legendposition: dataSource.chart.legendposition,
          entitytooltext: dataSource.chart.entitytooltext,
          legendcaption: dataSource.chart.legendcaption,
          entityfillhovercolor: dataSource.chart.entityfillhovercolor
        },
        colorRange: dataSource.colorrange,
        data: chartData
      }});
    }

  render() {
    return (
        <div>
          <h3>World Map in '{this.state.data.chart.theme}' Theme</h3>
          <button onClick={this.fillDay} id="fill-day"> Local Data </button>
          <button onClick={this.fillMonth} id="fill-month"> API Data </button>
        <ReactFC
          type="maps/world"
          width= "100%"
          dataFormat="JSON"
          dataSource={this.state.data}
        /></div>
    );
  }
}

export default ContinentConfigs;