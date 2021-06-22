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
import yearBackReducer from "../reducers/filtertopfifteen";
import { validatePackage } from "@progress/kendo-licensing";
import { Popover } from "react-bootstrap";
import { setExpandedState, tableKeyboardNavigationBodyAttributes } from "@progress/kendo-react-data-tools";


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
        entityfillhovercolor: "#FBFBFB"
    },
    colorrange: {
        gradient: "0",
        minvalue: "0",
        color: [
          {
            maxvalue: "25000",
            code: "#D1E9F2",
            displayValue: "Median"
          },
          {
            maxvalue: "2500000",
            code: "#527BB8",
            displayValue: "Median"
          },
          {
            maxvalue: "100000000000",
            code: "#0E336B"
          }

        ]
    },
    // Chart Data
    data:[]
};

const getStateDetails = (place:string, filtertype:string) => {
  const tempdataSource = {
    chart: dataSource.chart,
    colorrange: dataSource.colorrange,
    data: []
  }

    var url = "http://localhost:3000/TopFifteen";

    if("topfifteen" == filtertype){
      url = "http://localhost:3000/TopFifteen";
    }else if("yearback" == filtertype){
      url = "http://localhost:3000/YearsBack";
    }

    fetch(url)
    .then(res => res.text())
    .then(res => 
        {
          let items;
          if(place != ""){
            items = JSON.parse(res).filter(item => {return (place == item.location.state.toUpperCase())});
          } else {
            items = JSON.parse(res);
          }
          for (let i = 0; i<items.length; i++){
            var obj = {
                label:items[i].label.toString(),
                value:items[i].value.toString(), 
                date:items[i].date.toString(),
                details:items[i].details.toString(),
                id: items[i].location.state.toString()
            }
            tempdataSource.data.push(obj);
          }
        });

        return tempdataSource.data;
}

  const filterStateCount = (parsedlist:string, place:string) =>{

    //console.log(parsedlist);
    const items = JSON.parse(parsedlist).filter(item => {return (place == item.label.toUpperCase())});
    //const items = JSON.parse(parsedlist).filter(item=>{return(place == item.label)});

    if(items.length>0){
      return items[0].value;
    }
    return 0;
  }

  const fetchBase = () =>{
    const tempdataSource = {
      chart: dataSource.chart,
      colorrange: dataSource.colorrange,
      data: []
    }
    fetch("http://localhost:3000/USAroutes")
    .then(res => res.text()
    .then(res => 
      {
        const items = JSON.parse(res);
        for (let i = 0; i<items.length; i++){
          var obj = {
              value:items[i].value.toString(), 
              id: items[i].label.toString()
          }
          tempdataSource.data.push(obj);
        }

      }));
      
      return tempdataSource.data;
  }



const USMapComponent:FC<{type:string}> = (type) => {


      const [GridData, setGrid] = useState();
      const [StateData, setData] = useState(); 

      const [statename, setState] = useState("");
      const [filtertype, setFilter] = useState(type.type);


    const getInfo =(eventObj, dataObj)=>{ 
      setState((dataObj.id).toUpperCase());
    }

    const setInfo =()=>{
      setState("");
      //setGrid(StateData);
    }

   FusionCharts.addEventListener('entityRollOver', getInfo);
   FusionCharts.addEventListener('entityClick', setInfo);

    useEffect(() => {
      dataSource.data = fetchBase();
      console.log(dataSource.data);
    },[type.type])

    const isMountedVal = useRef(false);
    useEffect(() => {
      isMountedVal.current = true;
      if(statename != ""){
        console.log("use effecting");
        callAPI(statename);
      } else {
        console.log("pop");
        setPopover();
      }
      return () => {isMountedVal.current = false};
    },[statename])

    

    const callAPI = (usstate:string) =>{
      var hoverdata, clickdata;
      fetch("http://localhost:3000/USAroutes")
          .then(res => res.text()
          .then(res => 
            {
              console.log(usstate);
            if(usstate != ""){
              if(isMountedVal.current){
                hoverdata = filterStateCount(res,usstate);  // --> loads and filters intended state and its total contact sum
                clickdata = getStateDetails(usstate, filtertype);
                dataSource.chart.entitytooltext= "$lname: <b>$" + hoverdata+ "</b>";
                setGrid(clickdata); // --> loads detailed info in case button is clicked
               // setData(clickdata);
              }
            }
            }));
            return hoverdata;
    }

    const setPopover = () =>{
      
      if(GridData != undefined){
        const listValues = "<table class='table'><thead><tr><th scope='col'> # </th> <th>  </th> <th scope='col'> Contract </th> <th>  </th> <th scope='col'> Contract Amount </th> </tr></thead><tbody>" 
          + GridData.map((listitem, index) => ("<tr key={listitem.label}><th scope='row'>" + (index+1) + "</th> <td></td> <td>"
          +listitem.label + "</td><td></td><td> $" + listitem.value + "</td></tr>")).join('') + "</tbody></table>"
        dataSource.chart.entitytooltext=listValues;
        }
        setData(GridData); //-->preserves map detail info if we want to connect it to a table or something else
    }

    return(
        <div className="container">
            
          <ReactFC
                type="usa"
                width="90%"
                height="600"
                dataFormat="JSON"
                dataSource={dataSource}
            />
          
          
            {/*<Details loadedData={StateData}/>*/}
        </div>
    )
}

export default USMapComponent;