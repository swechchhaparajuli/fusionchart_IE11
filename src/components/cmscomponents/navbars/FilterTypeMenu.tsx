import React, {useState, useEffect} from "react";
import {FC} from "react";

import { useSelector } from "react-redux";


import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import CandyTheme from "fusioncharts/themes/fusioncharts.theme.candy";
import EuroChart from "../../charts/EuroChart"

import MyMaps from "../../charts/index"
import ContinentConfigs from "../../charts/ContinentConfigs"
import CountryConfigs from "../../charts/CountryConfigs"

import GraphChartBar from "./GraphChartBar";
import TopComponent from "./YearTopSortBar"
import USMapComponent from "../datadisplays/USAMap";



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
    data:[]
};

const getFilteredExact = (parsedlist:string) =>{
    const items = JSON.parse(parsedlist);

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

const MainMenu:FC = () => {

    const [TopData, setTopData] = useState(dataSource);
    const [showmap, setMap] = useState(false);
    const [showtop15, setTop15] = useState(false);
    const [maptype, setMapType] = useState("TopFifteen");

    const callDetailedAPI = () =>{
        var data;
        fetch("http://localhost:3000/TopFifteen")
            .then(res => res.text())
            .then(res => 
                {
                    data = getFilteredExact(res);
                    setTopData(data);
            });
            return data;
    }


    useEffect(() => { 
        callDetailedAPI();
    },[])


    return(
        <div >
          <Container fluid>
            <Row>
           <Navbar className="bg-light">  
          {!showmap &&<button className="btn" onClick={() =>  {setMapType("TopFifteen"), setMap(true),setTop15(false)}} >Map View</button>}
          {!showtop15 &&<button className="btn" onClick={() =>  {setTop15(true), setMap(false)}} >Data View</button>}
          </Navbar >
          </Row>
          <Row>
        {showmap && <USMapComponent loadedData={maptype}/>}
        </Row>
        {showtop15 && <Row><GraphChartBar /></Row>}
        {showtop15 && <Row><TopComponent loadedData={TopData}/></Row>}
        
        </Container>

        
            {/*
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

export default MainMenu;