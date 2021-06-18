import React, {useState} from "react";
import {FC} from "react";

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

const App:FC = () => {


    return(
        <div >

        
        <GraphChartBar />
        <USMapComponent />
        <CMSComponent />
            
            {/*
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