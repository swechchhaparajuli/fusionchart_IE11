import React, {useEffect} from "react";
import {FC} from "react";
import FusionCharts from "fusioncharts";
import ReactFC from 'react-fusioncharts';
import charts from "fusioncharts/fusioncharts.charts";
import ReactFusioncharts from "react-fusioncharts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import Column2D from "fusioncharts/fusioncharts.charts";
import {useSelector, useDispatch} from 'react-redux';

import {filterAll} from './actions/setFilter'


ReactFC.fcRoot(FusionCharts,Column2D,FusionTheme);
charts(FusionCharts);


const ChartComponent:FC = () => {




    let years = useSelector(state => state.yearBack);
    let num = useSelector(state => state.topChoice);
    

    //console.log("IN CHART"+JSON.stringify(years));
    /*componentDidMount = () =>{

    }*/


    return(
        <div className="container">
            <p>Top {num} {years.chart.xaxisname}</p>
            <ReactFusioncharts
                type="column2d"
                width="100%"
                height="400"
                dataFormat="JSON"
                dataSource={years}
      />
        </div>
    )
}

export default ChartComponent;