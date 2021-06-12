import React, {useState} from "react";
import {FC} from "react";
import FusionCharts from "fusioncharts";
import ReactFC from 'react-fusioncharts';
import charts from "fusioncharts/fusioncharts.charts";
import ReactFusioncharts from "react-fusioncharts";

charts(FusionCharts);


const dataSource = {
    chart: {
      caption: "Countries With Most Oil Reserves [2017-18]",
      subcaption: "In MMbbl = One Million barrels",
      xaxisname: "Country",
      yaxisname: "Reserves (MMbbl)",
      numbersuffix: "K",
      theme: "fusion"
    },
    data: [
      {
        label: "Venezuela",
        value: "290"
      },
      {
        label: "Saudi",
        value: "260"
      },
      {
        label: "Canada",
        value: "180"
      },
      {
        label: "Iran",
        value: "140"
      },
      {
        label: "Russia",
        value: "115"
      },
      {
        label: "UAE",
        value: "100"
      },
      {
        label: "US",
        value: "30"
      },
      {
        label: "China",
        value: "30"
      }
    ]
  };

const ChartComponent:FC = () => {


    return(
        <div >
            <p>CHART COMPONENT</p>  
            <ReactFusioncharts
                type="column2d"
                width="100%"
                height="100%"
                dataFormat="JSON"
                dataSource={dataSource}
      />
        </div>
    )
}

export default ChartComponent;