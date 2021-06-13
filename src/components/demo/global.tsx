import React, {useState} from "react";
import {FC} from "react";
import ChartComponent from "./chart";
import DetailsComponent from "./details";

const CMSComponent:FC = () => {
    return(
        <div >
            <h1>CMS COMPONENT</h1>  
            <ChartComponent />
            <DetailsComponent />
        </div>
    )
}

export default CMSComponent;