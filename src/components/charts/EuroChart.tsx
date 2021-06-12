import React, { Component } from 'react';

import FusionCharts from "fusioncharts"
import charts from 'fusioncharts/fusioncharts.charts';
import ReactFC from 'react-fusioncharts';
import CandyTheme from 'fusioncharts/themes/fusioncharts.theme.candy';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import UmberTheme from 'fusioncharts/themes/fusioncharts.theme.umber';
import OceanTheme from 'fusioncharts/themes/fusioncharts.theme.ocean';
import EuroData from '../../api/eurodata';
import FakeDataD from '../../api/whodAPI'
import FusionMaps from 'fusionmaps/fusioncharts.maps';
import Europe from 'fusionmaps/maps/fusioncharts.europe';

charts(FusionCharts);
ReactFC.fcRoot(FusionCharts, FusionMaps, Europe, CandyTheme, FusionTheme,UmberTheme, OceanTheme);

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
  

class EuroChart extends Component <{colors: string, dtype: string}>{

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
    data: dataSource.data
  }
};

  callAPI = () =>{
    fetch("http://localhost:3000/testAPI")
      .then(res => res.text())
      .then(res =>
          {this.setState({data: {
            chart: { 
              caption: this.state.data.chart.caption,
              theme: this.state.data.chart.theme,
              legendposition: this.state.data.chart.legendposition,
              entitytooltext: this.state.data.chart.entitytooltext,
              legendcaption: this.state.data.chart.legendcaption,
              entityfillhovercolor: this.state.data.chart.entityfillhovercolor
            },
            colorRange: this.state.data.colorRange,
            data: JSON.parse(res)
          }});
          console.log(JSON.parse(res));
        });
  }

  componentWillReceiveProps = (nextProps) =>{
          this.setState({data : 
          {
          chart: { 
          caption: nextProps.dtype,
          theme: nextProps.colors,
          legendposition: this.state.data.chart.legendposition,
          entitytooltext: this.state.data.chart.entitytooltext,
          legendcaption: this.state.data.chart.legendcaption,
          entityfillhovercolor: this.state.data.chart.entityfillhovercolor
        },
        colorRange: this.state.data.colorRange,
        data: this.state.data.data
      }}); 
  }

  componentDidMount = () => {
    this.callAPI();
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
      data: this.state.data.data
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
        data: this.state.data.data
      }});
  }

    render() {
      return (
        <div>
        <h3>Europe Map in '{this.state.data.chart.theme}' Theme</h3>
        <button onClick={this.fillDay} id="fill-day"> Local Data </button>
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

