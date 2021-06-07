import React, { Component } from 'react';

import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";

import UmberTheme from "fusioncharts/themes/fusioncharts.theme.umber";
import CandyTheme from "fusioncharts/themes/fusioncharts.theme.candy";

import FusionMaps from 'fusioncharts/fusioncharts.maps';
import USA from 'fusioncharts/maps/fusioncharts.usa';
import FakeData from '../../api/WHOAPI'
import FakeDataD from '../../api/whodAPI'
import "../../api/WHOAPI"


ReactFC.fcRoot(FusionCharts, USA, FusionMaps, CandyTheme);

// STEP 3 - Creating the JSON object to store the chart configurations
const dataSource = {
    // Chart Configuration
    chart: {
        caption: "Country COVID Vaccination",
        theme: "candy",
        legendposition: "BOTTOM",
        entitytooltext: "$lname: <b>$datavalue</b> vaccinations",
        legendcaption: "Number of vaccinations per day",
        entityfillhovercolor: "#FFCDD2"
    },
    colorrange: {
        gradient: "0",
        color: [
          {
            maxvalue: "50",
            displayvalue: "0-50",
            code: "#FFFEB6"
          },
          {
            maxvalue: "500",
            displayvalue: "51-500",
            code: "#6BF73C"
          },
          {
            maxvalue: "100000",
            displayvalue: "501-1000",
            code: "#33FBFF"
          },
          {
            maxvalue: "5000000000",
            displayvalue: "1001-5000",
            code: "#4533FF"
          },
          {
            maxvalue: "100000000000",
            displayvalue: "5000+",
            code: "#F73CDC"
          }
        ]
    },
    // Chart Data
    data: FakeData
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

  
class CountryConfigs extends Component <{colors: string, dtype: string}>{
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
    data: FakeData
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
       data: this.state.data.data
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
        data: FakeDataD
      }});
    }
  
  fillMonth = () => {
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
        data: FakeData
      }});
    }

  render() {
    return (
    <div >
      <h3>USA Map in '{this.state.data.chart.theme}' Theme</h3>
      <button onClick={this.fillDay} id="fill-day"> Local Data</button>
      <button onClick={this.fillMonth} id="fill-month"> API Data </button>
      <ReactFC
        type="usa"
        width="100%"
        dataFormat="JSON"
        dataSource={this.state.data}
      />
    </div>
    );
  }
}

export default CountryConfigs;