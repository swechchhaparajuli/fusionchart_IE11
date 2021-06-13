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


const ChartComponent:FC = () => {

    const years = useSelector(state => state.yearBack);
    //const datasource = useSelector(state => state.payload);

    return(
        <div className="container">
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