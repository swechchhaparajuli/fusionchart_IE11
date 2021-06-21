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

const dataSource = {
    // Chart Configuration
    chart: {
        caption: "",
        theme: "fusion",
        legendposition: "NONE",
        entitytooltext: "$lname: <b>$datavalue</b> constracts",
        legendcaption: "Number of constracts per state",
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
    data: [
      {
        label:"",
        value:"2000", 
        date:"12/12/1998",
        details:"test data",
        id: "CA"
      }
    ]
  };

const ChartComponent:FC<{loadedData}> = (loadedData) => {

    dataSource.data = loadedData.loadedData

    return(
        <div className="container">
            
            <ReactFusioncharts 
                type="column2d"
                width="90%"
                height="400"
                dataFormat="JSON"
                dataSource={dataSource}
      />
        </div>
    )
}

export default ChartComponent;