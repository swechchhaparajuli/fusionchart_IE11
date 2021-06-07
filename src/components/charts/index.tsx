import React, { Component } from 'react';


import EuroData from '../../api/eurodata';

import CountryConfigs from './CountryConfigs';
import ContinentConfigs from './ContinentConfigs';
import EuroChart from './EuroChart';



class MyMaps extends Component {

  state = { mapinfo: {
    interval: "exponential",
    colorscheme: "candy",
    caption: "Vaccines Per Year"
  },
    showUSA: false,
    showEurope: false, 
    showWorld: false
};


  showMap = (map:string) => {
    switch(map){
      case "showUSA":
        this.setState({showUSA: !this.state.showUSA});
        break;
      case "showEurope":
        this.setState({showEurope: !this.state.showEurope});
        break;
      case "showWorld":
        this.setState({showWorld: !this.state.showWorld});
        break;
      default: 
        null;
    }
  }

  changeLabelDay = () =>{
    this.setState({ mapinfo: {
      interval: "exponential",
      colorscheme: this.state.mapinfo.colorscheme,
      caption: "Vaccines per Day"
    }});
  }

  changeLabelMonth = () =>{
    this.setState({ mapinfo: {
      interval: "exponential",
      colorscheme: this.state.mapinfo.colorscheme,
      caption: "Vaccines per Month"
    }});

  }

  selectChange = (e:string) =>{
    this.setState({mapinfo: {
    interval: "exponential",
    colorscheme: e,
    caption: this.state.mapinfo.caption
  }});
    console.log("theme select change:" + this.state.mapinfo.colorscheme);
  }

  render() {
    const {showUSA, showEurope, showWorld} = this.state;
    return(
    // <div  key={this.state.mapinfo.data.chart.caption} >
      <div> 
      <div> <h2>Shared States of Theme</h2>
      <br></br>
        <label>Choose a color scheme for maps:</label>
        <select name="colorscheme" onChange={e => this.selectChange(e.target.value)} id="themes">
          <option value="candy">Candy</option>
          <option value="fusion">Fusion</option>
          <option value="ocean">Ocean</option>
          <option value="umber">Umber</option>
        </select>
      </div>

      <div> <h2>Shared States of Rate Per month OR Day</h2>
        <br></br>
        <button onClick={this.changeLabelDay}> Rate Per Day </button>
        <button onClick={this.changeLabelMonth}> Rate Per Month </button>
      </div>

      <div> <h2> </h2>
        {!showUSA && <button onClick={() => this.showMap("showUSA")}>Show USA Map</button>}
        {showUSA && <button onClick={() => this.showMap("showUSA")}>Hide USA Map</button>}
        {!showEurope && <button onClick={() => this.showMap("showEurope")}>Show Europe Map</button>}
        {showEurope && <button onClick={() => this.showMap("showEurope")}>Hide Europe Map</button>}
        {!showWorld && <button onClick={() => this.showMap("showWorld")}>Show World Map</button>}
        {showWorld && <button onClick={() => this.showMap("showWorld")}>Hide World Map</button>}
      </div>
      <h1>---------------------------------</h1>
      <div>
          {showEurope && <EuroChart colors={this.state.mapinfo.colorscheme} dtype={this.state.mapinfo.caption}/>}
          {showUSA && <CountryConfigs colors={this.state.mapinfo.colorscheme} dtype={this.state.mapinfo.caption}/>}
          {showWorld && <ContinentConfigs colors={this.state.mapinfo.colorscheme} dtype={this.state.mapinfo.caption}/>}
      </div>
    </div>
  )}
}

export default MyMaps;