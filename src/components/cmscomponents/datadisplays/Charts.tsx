import React, {useEffect} from "react";
import {FC} from "react";

import FusionCharts from "fusioncharts";
import ReactFC from 'react-fusioncharts';
import charts from "fusioncharts/fusioncharts.charts";
import ReactFusioncharts from "react-fusioncharts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import Column2D from "fusioncharts/fusioncharts.charts";
import {useSelector, useDispatch} from 'react-redux';

import {filterAll} from '../actions/setFilter'
import {filterTopCount} from '../actions/filterTop15'


ReactFC.fcRoot(FusionCharts,Column2D,FusionTheme);
charts(FusionCharts);



const ChartComponent:FC = () => {

    let years = useSelector(state => state.yearBack);

    return(
        <div className="container">
            
            <ReactFusioncharts 
                type="column2d"
                width="90%"
                height="400"
                dataFormat="JSON"
                dataSource={years}
      />
        </div>
    )
}

export default ChartComponent;