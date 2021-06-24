import React, {useState, useEffect, useRef} from "react";
import {FC} from "react";

import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";

import FusionMap from 'fusioncharts/fusioncharts.maps';
import USA from 'fusioncharts/maps/fusioncharts.usa';

import charts from "fusioncharts/fusioncharts.charts";
import Details from "./Details"

import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

import {useSelector, useDispatch} from 'react-redux';

// API fetches 
import {stateTotalValue} from '../../../api/USAroutes'


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
        showEntityHoverEffect: "0",
        entityfillhovercolor: "#FFFFFF",
        tooltipbgcolor: "#FFFFFF",
        entityfillcolor: "#FFFFFF",
        nullentitycolor: "#ECE9D3"
    },
    colorrange: {
        gradient: "0",
        minvalue: "0",
        color: [
          {
            maxvalue: "1",
            code: "#ECE9D3",
            displayValue: "None"
          },
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
                id: items[i].location.state.toString(),
                project_id: items[i].id.toString(),
            }
            tempdataSource.data.push(obj);
          }
        });
        return tempdataSource.data;
}

  const filterStateCount = (parsedlist, place:string) =>{

    //console.log(parsedlist);
    const items = parsedlist.filter(item => {return (place == item.label.toUpperCase())});
    //const items = JSON.parse(parsedlist).filter(item=>{return(place == item.label)});

    if(items.length>0){
      return items[0].value;
    }
    return 0;
  }



const USMapComponent:FC<{type:string}> = (type) => {


      const [GridData, setGrid] = useState();
      const [StateData, setData] = useState(); 
      const [BaseData, setBase] = useState();

      const [statename, setState] = useState("");
      const [clickname, setClick] = useState("");

      
      const [filtertype, setFilter] = useState(type.type);

      const fetchBase = () =>{
        const tempdataSource = {
          chart: dataSource.chart,
          colorrange: dataSource.colorrange,
          data: []
        }
        stateTotalValue().then(res => 
          {
            const items = res;
            if(isBaseMounted.current){
            for (let i = 0; i<items.length; i++){
              var obj = {
                  value:items[i].value.toString(), 
                  id: items[i].label.toString()
              }
              tempdataSource.data.push(obj);
            }
            setBase(tempdataSource.data);
          }
          });
        
          return tempdataSource.data;
      }

      const isBaseMounted = useRef(false);
// fetches base map data for first render
    useEffect(() => {
      isBaseMounted.current = true;
      if(BaseData == undefined){
        console.log("FETCH BASE");
        dataSource.data = fetchBase();
        // insert code for editing of color intervals on map depending on the data here //
      }
      console.log("useEffect 1");
      console.log(dataSource.data);
        
      return () => {isBaseMounted.current = false};
    },[BaseData]);


    const getInfo =(eventObj, dataObj)=>{ 
      setState((dataObj.id).toUpperCase());
    }

    const setInfo =(eventObj, dataObj)=>{
      setClick((dataObj.id).toUpperCase());
    }

    FusionCharts.addEventListener('entityRollOver', getInfo);
    FusionCharts.addEventListener('entityClick', setInfo);



// allows render of data of hovered state when state changed
    const isMountedVal = useRef(false);
    useEffect(() => {
      isMountedVal.current = true;
       if (statename != ""){
        console.log("Hovered over:" + statename);
        callAPI(statename);
      }
      return () => {isMountedVal.current = false};
    },[statename])

// allows render of detailed data over state on click 
    useEffect(() => {
      if(clickname != ""){
        console.log("Clicked on:" + statename);
        setPopover(); // statename,'clickname' wont show details if you hover out and click previously clicked state
      }
    },[clickname])

    const callAPI = (usstate:string) =>{
      var hoverdata, clickdata;
      stateTotalValue().then(res => 
        {
            if(usstate != ""){
              if(isMountedVal.current){
                hoverdata = filterStateCount(res,usstate);  // --> loads and filters intended state and its total contact sum
                clickdata = getStateDetails(usstate, filtertype);
                dataSource.chart.entitytooltext= "$lname: <b>$" + hoverdata+ "</b>";
                setGrid(clickdata); // --> loads detailed info in case button is clicked
              }
            }
            });
            return hoverdata;
    }

    const setPopover = () =>{
      if(GridData != undefined){
        const listValues = "<table class='table'><thead><tr><th scope='col'> # </th> <th>  </th> <th scope='col'> Contract </th> <th>  </th> <th scope='col'> Contract Amount </th> </tr></thead><tbody>" 
          + GridData.map((listitem, index) => ("<tr key={listitem.label}><th scope='row'>" + (index+1) + "</th> <td></td> <td>"
          +listitem.label + "</td><td></td><td> $" + listitem.value + "</td></tr>")).join('') + "</tbody></table>"
        dataSource.chart.entitytooltext=listValues;
        setData(GridData); //-->preserves map detail info if we want to connect it to a table or something else
      }
    }

    return(
        <div className="container" >
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