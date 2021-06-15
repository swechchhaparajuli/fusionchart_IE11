import React from "react";
import {Suspense} from "react";
import {FC} from "react";
import {useSelector, useDispatch} from 'react-redux';
// ES2015 module syntax
import {
  Grid,
  GridColumn as Column,
  GridCellProps,
} from "@progress/kendo-react-grid";



const DetailsComponent:FC = () => {
  let years = useSelector(state => state.yearBack);

  

    return(

      <div>
        
      <Grid style={{ width: "90%", height:"400px", overflow: "scroll"}}  data={years}>
        <Column field="id" title="" />
        <Column field="date" title="Date" />
        <Column field="label" title="Company" />
        <Column field="value" title="Number of Contracts" />
        <Column field="details" title="More Info..." />
      </Grid>
  
      </div>
    )
}

export default DetailsComponent;