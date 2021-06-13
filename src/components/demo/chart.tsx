import React, {useState} from "react";
import {FC} from "react";
import FusionCharts from "fusioncharts";
import ReactFC from 'react-fusioncharts';
import charts from "fusioncharts/fusioncharts.charts";
import ReactFusioncharts from "react-fusioncharts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import Column2D from "fusioncharts/fusioncharts.charts";
import {useSelector, useDispatch} from 'react-redux';
import {filterTime} from './actions/filterTime'
import {filterTopCount} from './actions/filterTop15'

ReactFC.fcRoot(FusionCharts,Column2D,FusionTheme);
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

    const topcount = useSelector(state => state.topCount);
    const years = useSelector(state => state.yearBack);
    //const datasource = useSelector(state => state.payload);

    const dispatch = useDispatch();

    return(
        <div className="container">
            <h1>Filter Year </h1>
            <button onClick={() => dispatch(filterTime(2020))}>Past Year</button>
            <button onClick={() => dispatch(filterTime(2019))}>Past Two Years</button>
            <button onClick={() => dispatch(filterTime(2010))}>Past Ten Years</button>

            <h1> Filter Top Count</h1>
            <button onClick={() => dispatch(filterTopCount(10))}>Top Ten</button>
            <button onClick={() => dispatch(filterTopCount(15))}>Top 15</button>
            <button onClick={() => dispatch(filterTopCount(0))}>All</button>


            <p>CHART COMPONENT</p>  
            <ReactFusioncharts
                type="column2d"
                width="100%"
                height="100%"
                dataFormat="JSON"
                dataSource={years}
      />
        </div>
    )
}

export default ChartComponent;