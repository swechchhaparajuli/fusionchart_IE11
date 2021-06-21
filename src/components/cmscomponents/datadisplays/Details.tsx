import React from "react";
import {useState, useEffect, useReducer} from "react";
import {Suspense} from "react";
import {FC} from "react";
import {Component} from "react";

import yearBackReducer from "../reducers/filtertopfifteen";

import {useSelector, useDispatch} from 'react-redux';
// ES2015 module syntax
import {
  Grid,
  GridColumn as Column,
  GridCellProps,
} from "@progress/kendo-react-grid";

const dataSource = {
  // Chart Configuration
  chart: {
      caption: "",
      theme: "fusion",
      legendposition: "NONE",
      entitytooltext: "$lname: <b>$datavalue</b> constracts",
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
  data: [
    {
      label:"",
      value:"2000", 
      date:"12/12/1998",
      details:"test data",
      id: "CA"
    }
  ]
};



class DetailsComponent extends Component <{loadedData}> {

    render(){

    return(

      <div>
        
      <Grid style={{ width: "400", height:"400px", overflow: "scroll"}}  data={this.props.loadedData}>
        <Column field="1" title="" />
        <Column field="date" title="Date" />
        <Column field="label" title="Company" />
        <Column field="value" title="Number of Contracts" />
        <Column field="details" title="More Info..." />
      </Grid>
  
      </div>
    )
    }
}

export default DetailsComponent;