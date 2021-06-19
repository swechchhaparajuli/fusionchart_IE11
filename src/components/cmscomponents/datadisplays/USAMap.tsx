import React, {useState, useEffect, useRef, useReducer} from "react";
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
import yearBackReducer from "../reducers/filtertopfifteen";
import { validatePackage } from "@progress/kendo-licensing";


ReactFC.fcRoot(FusionCharts, USA, FusionMap, FusionTheme);
charts(FusionCharts);


const dataSource = {
    // Chart Configuration
    chart: {
        caption: "",
        theme: "fusion",
        legendposition: "NONE",
        entitytooltext: "$lname: <b>$datavalue</b> contracts",
        legendcaption: "Number of contracts per state",
        entityfillhovercolor: "#FFCDD2"
    },
    colorrange: {
        gradient: "0",
        color: [
          {
            maxvalue: "50",
            displayvalue: "0-50",
            code: "#FFFFFF"
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
    data:[{
      label:"",
      value:"2000", 
      date:"12/12/1998",
      details:"test data",
      id: "CA"
    }]
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
  }


const USMapComponent:FC<{loadedData}> = (loadedData) => {

     // console.log(loadedData.loadedData);
  
      const [GridData, setGrid] = useState();
      const [StateData, setData] = useState();
      const [statename, setState] = useState("NONE"); 
      var count = 0;


    const getInfo =(eventObj, dataObj)=>{ 
      setState((dataObj.id).toUpperCase());
    }

    const setInfo =(eventObj, dataObj)=>{
      setState("NONE");
      setGrid(StateData);
      count = 1;

    }

   FusionCharts.addEventListener('entityRollOver', getInfo);
   FusionCharts.addEventListener('entityClick', setInfo);

    const isMountedVal = useRef(false);
    useEffect(() => {
      
      isMountedVal.current = true;
      if(statename != "NONE"){
        console.log("use effecting");
        callAPI(statename);
      } else {
        console.log("pop");
        setPopover();
      }
      return () => {isMountedVal.current = false};
    },[statename])


    const callAPI = (usstate:string) =>{
      var data;
        fetch("http://localhost:3000/CMSRoutes")
          .then(res => res.text())
          .then(res => 
            {
              console.log(usstate);
            if(usstate != ""){
              if(isMountedVal.current){
                data = getFilteredByState(res,usstate);
                loadedData.loadedData.chart.entitytooltext= "$lname: <b>" + data.length + "</b> contracts";
                setData(data); 
              }
            }
            });
            return data;
    }

    const setPopover = () =>{

      if(StateData != undefined){
        const listValues = "<table class='table'><thead><tr><th scope='col'> # </th> <th>  </th> <th scope='col'> Company </th> <th>  </th> <th scope='col'> Contract Amount </th> </tr></thead><tbody>" 
          + StateData.map((listitem, index) => ("<tr key={listitem.label}><th scope='row'>" + (index+1) + "</th> <td></td> <td>"
          
          +listitem.label + "</td><td></td><td> $" + listitem.value + "</td></tr>")).join('') + "</tbody></table>"
  
       
        loadedData.loadedData.chart.entitytooltext=listValues; 
        }
        
    }

    return(
        <div className="container">
            
            <ReactFC
                type="usa"
                width="90%"
                height="600"
                dataFormat="JSON"
                dataSource={loadedData.loadedData}
            />

          
            {/*statename == "" && <Details loadedData={GridData}/>*/}
        </div>
    )
}

export default USMapComponent;