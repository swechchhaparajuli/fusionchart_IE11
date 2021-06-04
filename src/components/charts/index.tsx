import React, { Component } from 'react';


import EuroData from '../../api/eurodata';


import CountryConfigs from './CountryConfigs';
import ContinentConfigs from './ContinentConfigs';
import EuroChart from './EuroChart';



const mapSetup = {
    chart: {
      caption: "Sales of Cigarettes in Europe",
      subcaption: "(per adult per day)",
      legendposition: "BOTTOM",
      entitytooltext: "$lname: <b>$datavalue </b>cigarettes",
      legendcaption: "Number of cigarettes smoked per adult per day",
      entityfillhovercolor: "#FFCDD2",
      theme: "candy"
    },
    colorrange: {
      gradient: "0",
      color: [
        {
          maxvalue: "400",
          displayvalue: "2-400",
          code: "#EF9A9A"
        },
        {
          maxvalue: "60000",
          displayvalue: "40-60000",
          code: "#EF5350"
        },
        {
          maxvalue: "8000000",
          displayvalue: "600000-8000000",
          code: "#E53935"
        },
        {
          maxvalue: "10000000",
          displayvalue: "8000000-100000000",
          code: "#C62828"
        },
        {
          maxvalue: "0",
          displayvalue: "No data available",
          code: "#FFEBEE"
        }
      ]
    },
    data: EuroData
  };


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


// class MyMaps extends Component <{mtype: string}>{

//     state = {
//         type:this.props.mtype,
//         width:"100%",
//         dataFormat:"JSON",
//         datasource: mapSetup
//     }

//     changeLabel = (val:string) =>{
//         this.setState({
//             chart:{
//                 caption: "Vaccines Per " + val,
//                 theme: mapSetup.chart.theme,
//                 legendposition: mapSetup.chart.legendposition,
//                 entitytooltext: mapSetup.chart.entitytooltext,
//                 legendcaption: "Vaccines Per " + val,
//                 entityfillhovercolor: mapSetup.chart.entityfillhovercolor
//             }
//         });
//     }   

//     render() {
//     return(
//         <div>
//             <button onClick={() => {this.changeLabel("Day")}}> Day Data </button>
//             <button onClick={() => {this.changeLabel("Month")}}> Month Data </button>
//             <button onClick={() => {this.changeLabel("Year")}}> Year Data </button>
//             {/* <MapConfig mtype={this.state}/> */}
//             <EuroChart dtype={this.state.datasource}/>
//             <CountryConfigs dtype={this.state.datasource}/>
//             <ContinentConfigs dtype={this.state.datasource}/>
//         </div>
//     );
//     }
    
// }

type DataConfig = {
  chart: {caption: string, 
      theme: string,
      legendposition: string, 
      entitytooltext:string,
      legendcaption:string, 
      entityfillhovercolor:string
  };
}



class MyMaps extends Component {

  state = {data: {
    chart: {
      caption: "Vaccines Per Year",
      theme: "candy",
      legendposition: "BOTTOM",
      entitytooltext: "$lname: <b>$datavalue </b> vaccines",
      legendcaption: "Vaccines Per Year",
      entityfillhovercolor: " Vaccines"
    }
  }};

  changeLabelDay = () =>{
    this.setState({data: {
    chart : {
        caption: "Vaccines Per Day",
        theme: "candy",
        legendposition: "BOTTOM",
        entitytooltext: "$lname: <b>$datavalue </b> vaccines",
        legendcaption: "Vaccines Per Day",
        entityfillhovercolor: " Vaccines"
    }
    }});
  }
  changeLabelMonth = () =>{
    this.setState({data: {
    chart : {
        caption: "Vaccines Per Month",
        theme: "candy",
        legendposition: "BOTTOM",
        entitytooltext: "$lname: <b>$datavalue </b> vaccines",
        legendcaption: "Vaccines Per Month",
        entityfillhovercolor: " Vaccines"
    }
    }});
  }

  render() {
    return(
    <div key={this.state.data.chart.caption}>
        <button onClick={this.changeLabelDay}> Day Label </button>
        <button onClick={this.changeLabelMonth}> Month Label </button>
        <EuroChart dtype={this.state.data}/>
        <CountryConfigs dtype={this.state.data}/>
        <ContinentConfigs dtype={this.state.data}/>
    </div>
  )}

}



export default MyMaps;