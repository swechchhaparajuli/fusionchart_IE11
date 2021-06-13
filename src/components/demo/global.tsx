import React, {useState} from "react";
import {FC} from "react";
import {useDispatch, useSelector} from 'react-redux';
import ChartComponent from "./chart";
import DetailsComponent from "./details";
import {filterTime} from './actions/filterTime'
import {filterTopCount} from './actions/filterTop15'

const CMSComponent:FC = () => {

    const dispatch = useDispatch();
    const topcount = useSelector(state => state.topCount);
    return(
        <div >
            
            <h1>Filter Year </h1>
            <button onClick={() => dispatch(filterTime(2020))}>Past Year</button>
            <button onClick={() => dispatch(filterTime(2019))}>Past Two Years</button>
            <button onClick={() => dispatch(filterTime(2010))}>Past Ten Years</button>

            <h1> Filter Top Count {topcount}</h1>
            <button onClick={() => dispatch(filterTopCount(10))}>Top Ten</button>
            <button onClick={() => dispatch(filterTopCount(15))}>Top 15</button>
            <button onClick={() => dispatch(filterTopCount(0))}>All</button>
            <h1>CMS COMPONENT</h1>  
            <ChartComponent />
            <DetailsComponent />
        </div>
    )
}

export default CMSComponent;