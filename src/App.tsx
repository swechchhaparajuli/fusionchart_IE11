import React, {useState} from "react";
import {FC} from "react";
import "./styles.scss";
import CandyTheme from "fusioncharts/themes/fusioncharts.theme.candy";
import EuroChart from "./components/charts/EuroChart"

import MyMaps from "./components/charts/index"
import ContinentConfigs from "./components/charts/ContinentConfigs"
import CountryConfigs from "./components/charts/CountryConfigs"
import CMSComponent from "./components/demo/global"


var changeLabel = (val: string) =>{
  
    var config = {
    chart : {
        caption: "Vaccines Per " + val,
        theme: "candy",
        legendposition: "BOTTOM",
        entitytooltext: "$lname: <b>$datavalue </b> vaccines",
        legendcaption: "Vaccines Per " + val,
        entityfillhovercolor: " Vaccines"
    }
    };
    return config;
}

const App:FC = () => {
    const env = process.env.NODE_ENV;
    const [chart, setState] = useState(changeLabel("Annee")); 

    return(
        <div >
            <h1>{env}</h1>
            {/*<CMSComponent />*/}
            <MyMaps /> 
            {/* <button onClick={() => setState(changeLabel("Day"))}> Day Label </button>
            <button onClick={() => setState(changeLabel("Month"))}> Month Label </button>
            <EuroChart dtype={chart}/>
            <CountryConfigs dtype={chart}/>
            <ContinentConfigs dtype={chart}/> */}
        </div>
    )
}

export default App;