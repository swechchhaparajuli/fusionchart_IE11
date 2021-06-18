import React, {useState} from "react";
import {FC} from "react";

import { useSelector } from "react-redux";

import "./styles.scss";
import CandyTheme from "fusioncharts/themes/fusioncharts.theme.candy";
import EuroChart from "./components/charts/EuroChart"

import MyMaps from "./components/charts/index"
import ContinentConfigs from "./components/charts/ContinentConfigs"
import CountryConfigs from "./components/charts/CountryConfigs"

import GraphChartBar from "./components/cmscomponents/navbars/GraphChartBar";
import CMSComponent from "./components/cmscomponents/navbars/YearTopSortBar"
import USMapComponent from "./components/cmscomponents/datadisplays/USAMap";

//const env = process.env.NODE_ENV;
// <h1>{env}</h1>


const dataSource = {
    // Chart Configuration
    chart: {
        caption: "",
        theme: "fusion",
        legendposition: "NONE",
        entitytooltext: "$lname: <b>$datavalue</b> contracts",
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
    data:[{
      label:"",
      value:"2000", 
      date:"12/12/1998",
      details:"test data",
      id: "CA"
    }]
};

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

const App:FC = () => {

    const [StateData, setData] = useState(dataSource);

    const callAPI = () =>{
        var data;
        fetch("http://localhost:3000/CMSRoutes")
            .then(res => res.text())
            .then(res => 
                {
                    data = getFilteredExact(res);
                    setData(data);
            });
            return data;
    }

    callAPI();

        //let years = useSelector(state => state.yearBack);  

    return(
        <div >
        <USMapComponent loadedData={StateData}/>
            {/*
             <GraphChartBar />
             <CMSComponent />
            <MyMaps /> 
             */}
            {/* <button onClick={() => setState(changeLabel("Day"))}> Day Label </button>
            <button onClick={() => setState(changeLabel("Month"))}> Month Label </button>
            <EuroChart dtype={chart}/>
            <CountryConfigs dtype={chart}/>
            <ContinentConfigs dtype={chart}/> */}
        </div>
    )
}

export default App;