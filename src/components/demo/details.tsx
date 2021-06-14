import React, {useState} from "react";
import {FC} from "react";
import ReactDataGrid from 'react-data-grid';

const DetailsComponent:FC = () => {

    const columns = [
        { key: 'id', name: 'ID' },
        { key: 'title', name: 'Title' }
      ];
      
      const rows = [
        { id: 0, title: 'Example' },
        { id: 1, title: 'Demo' }
      ];
    

    return(
        <div >
            <p>DETAILS COMPONENT</p>  
     
        </div>
    )
}

export default DetailsComponent;