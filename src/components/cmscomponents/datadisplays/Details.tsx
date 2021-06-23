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


const DetailsComponent:FC<{loadedData}> = (loadedData) => {

    return(

      <div>
        
      <Grid style={{ width: "400", height:"400px", overflow: "scroll"}}  data={loadedData.loadedData}>
        <Column field="project_id" title="#" />
        <Column field="date" title="Date" />
        <Column field="label" title="Company" />
        <Column field="value" title="Contract Value" />
        <Column field="details" title="More Info..." />
      </Grid>
  
      </div>
    )
    
}

export default DetailsComponent;