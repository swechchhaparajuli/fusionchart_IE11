import React, {useState, useEffect, useRef} from "react";
import {FC} from "react";


import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import FusionMaps from "fusionmaps"

import UmberTheme from "fusioncharts/themes/fusioncharts.theme.umber";
import CandyTheme from "fusioncharts/themes/fusioncharts.theme.candy";

import FusionMap from 'fusioncharts/fusioncharts.maps';
import USA from 'fusioncharts/maps/fusioncharts.usa';

import charts from "fusioncharts/fusioncharts.charts";
import Details from "./Details"

import ReactFusioncharts from "react-fusioncharts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

import {useSelector, useDispatch} from 'react-redux';

import {usStateFilter} from '../actions/setByUSState'


ReactFC.fcRoot(FusionCharts, USA, FusionMap, FusionTheme);
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

const getFilteredByState = (parsedlist, place:string) => {
  console.log("FILTERCHECK:")
  //console.log(place);
 // console.log(JSON.parse(parsedlist)[2].location.state);
  const items = JSON.parse(parsedlist).filter(item => {return (place == item.location.state)});
  dataSource.data = [];
  for (let i = 0; i<items.length; i++){
    var obj = {
        label:items[i].label.toString(),
        value:items[i].value.toString(), 
        date:items[i].date.toString(),
        details:items[i].details.toString(),
        id: items[i].location.state.toString()
    }
    dataSource.data.push(obj);
}
  //console.log(newdata);
  //console.log(dataSource.data);
  return dataSource.data;
}
/*
  const getFilteredExact = (parsedlist:string) =>{
    const items = JSON.parse(parsedlist);
    //console.log(items);
    dataSource.data = [];
    for (let i = 0; i<items.length; i++){
      var obj = {
        label:items[i].label.toString(),
        value:items[i].value.toString(), 
        date:items[i].date.toString(),
        details:items[i].details.toString(),
        id: items[i].location.state.toString().toUpperCase()
      }
      dataSource.data.push(obj);
  }
  
    return dataSource;
  }*/


const USMapComponent:FC = () => {


    let years = useSelector(state => state.yearBack);

    const [StateData, setData] = useState(years); 
    const [statename, setState] = useState(""); 
    var count = 0;


    const setInfo =(eventObj, dataObj)=>{ 
      setState((dataObj.id).toUpperCase());
    }

   FusionCharts.addEventListener('entityClick', setInfo);

    const isMountedVal = useRef(false);
    useEffect(() => {
      console.log("use effecting");
      isMountedVal.current = true;
      if(statename != ""){
        callAPI(statename);
        count = 1;
        console.log("API was called");
      }
      return () => {isMountedVal.current = false};
    },[statename])

    const callAPI = (usstate:string) =>{
      var data;
      
        fetch("http://localhost:3000/CMSRoutes")
          .then(res => res.text())
          .then(res => 
            {
              if(isMountedVal.current){
                data = getFilteredByState(res,usstate);
                setData(data); //this is fine bring it back once i fix weird loop
              }
            });
      
          /*  dataSource.data = getFilteredByState(years.data, (dataObj.id).toUpperCase());
                  count++;*/
            return data;
    }

   

    return(
        <div className="container">
            
            <ReactFC
                type="usa"
                width="90%"
                height="400"
                dataFormat="JSON"
                dataSource={years}
            />

            {statename != "" && <Details loadedData={StateData}/>}
        </div>
    )
}

export default USMapComponent;