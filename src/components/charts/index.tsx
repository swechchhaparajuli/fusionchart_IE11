import React, { Component } from 'react';


import EuroData from '../../api/mappractice/eurodata';

import CountryConfigs from './CountryConfigs';
import ContinentConfigs from './ContinentConfigs';
import EuroChart from './EuroChart';



class MyMaps extends Component {

  state = { mapinfo: {
    interval: 10,
    colorscheme: "candy",
    caption: "Vaccines Per Year",
    min: 0,
    max:20000000000
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
      interval: this.state.mapinfo.interval,
      colorscheme: this.state.mapinfo.colorscheme,
      caption: "Vaccines per Day",
      min: this.state.mapinfo.min,
      max:this.state.mapinfo.max
    }});
  }

  changeLabelMonth = () =>{
    this.setState({ mapinfo: {
      interval: this.state.mapinfo.interval,
      colorscheme: this.state.mapinfo.colorscheme,
      caption: "Vaccines per Month",
      min: this.state.mapinfo.min,
      max:this.state.mapinfo.max
    }});

  }

  selectChange = (e:string) =>{
    this.setState({mapinfo: {
    interval: this.state.mapinfo.interval,
    colorscheme: e,
    caption: this.state.mapinfo.caption,
    min: this.state.mapinfo.min,
    max:this.state.mapinfo.max
  }});
   
  }

  handleMaxInput(event:number) {
    this.setState({
      interval: this.state.mapinfo.interval,
      colorscheme: this.state.mapinfo.interval,
      caption: this.state.mapinfo.caption,
      min: this.state.mapinfo.min,
      max: event
    });
    console.log(event);
  }

  handleMinInput(event:number){
    this.setState({
      interval: this.state.mapinfo.interval,
      colorscheme: this.state.mapinfo.interval,
      caption: this.state.mapinfo.caption,
      min: event,
      max: this.state.mapinfo.max
    });
    console.log(event);
  }

  handleSubmit(){
    console.log("submitted");
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


      <h2>Shared States of Interval</h2>
      <form>
        <label>Enter range max
        <input type="number" id="maxIn" value={this.state.mapinfo.max} onChange={event => this.handleMaxInput(event.currentTarget.value)}/>
        <input type="submit" value="Submit"></input>
        </label>
      </form>
      <form>
      <label>Enter range min
      <input type="number" id="minIn" value={this.state.mapinfo.min} onChange={event => this.handleMinInput(event.currentTarget.value)}/>
      <input type="submit" value="Submit"></input>
      </label>
      </form>


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