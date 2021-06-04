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


type MapType = {
        type:string,
        width:string,
        dataFormat:string,
        datasource: {
            chart: {
                caption: string,
                theme: string, 
                legendposition: string,
                entitytooltext: string,
                legendcaption: string,
                entityfillhovercolor: string,
            },
            colorrange: {
                gradient: string,
                color: [
                    {
                        maxvalue: string,
                        displayvalue:string,
                        code: string,
                    }
                ]
            },
            data: [
                {
                    id: string,
                    value: string,
                }
            ]
        }
  }

class MapConfig extends Component <{mtype: MapType}>{

  state = {
    type: this.props.mtype.type,
    width:this.props.mtype.width,
    dataformat:this.props.mtype.dataFormat,
    datasource: {
        chart: this.props.mtype.datasource.chart,
        colorrange: this.props.mtype.datasource.colorrange,
        data: FakeDataD
    }
  };

  fillDay = () =>{
    this.setState({datasource : 
    {
      chart: this.props.mtype.datasource.chart,
      colorRange: this.props.mtype.datasource.colorrange,
      data: EuroData
    }});
  }
  
  fillMonth = () =>{
    this.setState({datasource : 
      {
        chart: this.props.mtype.datasource.chart,
        colorRange: this.props.mtype.datasource.colorrange,
        data: FakeDataD
      }});
  }

    render() {
      return (
        <div>
        <button onClick={this.fillDay} id="fill-day"> JSON </button>
        <button onClick={this.fillMonth} id="fill-month"> API Data </button>
        <ReactFC
            {...this.state}
        />
        </div>
      );
    }
  }

  export default MapConfig;

