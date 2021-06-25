import React, {useState} from "react";
import {FC} from "react";

import { useSelector } from "react-redux";

import "./styles.scss";
import Navbar from 'react-bootstrap/Navbar';
import CandyTheme from "fusioncharts/themes/fusioncharts.theme.candy";
import EuroChart from "./components/charts/EuroChart"

import MyMaps from "./components/charts/index"
import ContinentConfigs from "./components/charts/ContinentConfigs"
import CountryConfigs from "./components/charts/CountryConfigs"

import GraphChartBar from "./components/cmscomponents/navbars/GraphChartBar";
import TopComponent from "./components/cmscomponents/navbars/YearTopSortBar"
import USMapComponent from "./components/cmscomponents/datadisplays/USAMap";

import MainMenu from "./components/cmscomponents/navbars/ViewMenu";


//const env = process.env.NODE_ENV;
// <h1>{env}</h1>


const App:FC = () => {

        //let years = useSelector(state => state.yearBack);  

    return(
        <div >
          
          <MainMenu />
          
          
          {/*
          <USMapComponent type={"TopFifteen"}/>
           <Navbar className="bg-light">  
          {!showmap &&<button className="btn" onClick={() =>  {setMap(true), setTop15(false)}} >Click for US Map</button>}
          {!showtop15 &&<button className="btn" onClick={() =>  {setTop15(true), setMap(false)}} >Click for Top 15</button>}
          </Navbar >
        {showmap && <USMapComponent loadedData={StateData}/>}
        {showtop15 && <GraphChartBar /> && <TopComponent loadedData={StateData}/>}
            
             <Navbar className="bg-light">  
          {!showmap &&<button className="btn" onClick={() =>  {setMap(true), setTop15(false)}} >Click for US Map</button>}
          {!showtop15 &&<button className="btn" onClick={() =>  {setTop15(true), setMap(false)}} >Click for Top 15</button>}
          </Navbar >

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