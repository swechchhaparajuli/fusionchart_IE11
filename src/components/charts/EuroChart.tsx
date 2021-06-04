import React, { Component } from 'react';

import FusionCharts from "fusioncharts"
import charts from 'fusioncharts/fusioncharts.charts';
import ReactFC from 'react-fusioncharts';
import CandyTheme from 'fusioncharts/themes/fusioncharts.theme.candy';
import EuroData from '../../api/eurodata';
import FakeDataD from '../../api/whodAPI'
import FusionMaps from 'fusionmaps/fusioncharts.maps';
import Europe from 'fusionmaps/maps/fusioncharts.europe';

charts(FusionCharts);
ReactFC.fcRoot(FusionCharts, FusionMaps, Europe, CandyTheme);

const dataSource = {
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
  

  type DataConfig = {
    chart: {caption: string, 
        theme: string,
        legendposition: string, 
        entitytooltext:string,
        legendcaption:string, 
        entityfillhovercolor:string
    };
  }

class EuroChart extends Component <{dtype: DataConfig}>{

  state = {data: {
    chart: this.props.dtype.chart,
    colorRange: dataSource.colorrange,
    data: EuroData
  }};
  

  fillDay = () =>{
    this.setState({data : 
    {
      chart: this.props.dtype.chart,
      colorRange: dataSource.colorrange,
      data: EuroData
    }});
  }
  
  fillMonth = () =>{
    this.setState({data : 
      {
        chart: this.props.dtype.chart,
        colorRange: dataSource.colorrange,
        data: FakeDataD
      }});
  }

    render() {
      return (
        <div key={this.props.dtype.chart.caption}>
        <button onClick={this.fillDay} id="fill-day"> JSON </button>
        <button onClick={this.fillMonth} id="fill-month"> API Data </button>
        <ReactFC
          type="europe"
          width="100%"
          dataFormat="JSON"
          dataSource={this.state.data}
        />
        </div>
      );
    }
  }

  export default EuroChart;

