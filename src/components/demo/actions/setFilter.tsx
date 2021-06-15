
import React, {
  Fragment,
  useState,
  useEffect,
  useReducer,
} from 'react';
import {useSelector, useDispatch} from 'react-redux';

const dataSource = {
    chart: {
      caption: "   ",
      subcaption: "   ",
      xaxisname: "Companies",
      yaxisname: "Contracts",
      numbersuffix: "",
      theme: "fusion"
    },
    data: [
      {
        label: "Venezuela",
        value: "290"
      }
    ]
  };

  const getListFiltered = (parsedlist:string, count:number, time:Date) =>{
    const items = JSON.parse(parsedlist).filter(item => {var temp = new Date(item.date); return temp<time}).sort((a,b) => 0 - (parseInt(a.value) > parseInt(b.value) ? -1 : 1));
    const temp = items.slice(0,count);
    console.log(temp);
    var newdata = [{label:"Test", value:"1000", date:"08/12/1997", details:"Test dummy ", }];
    for (let i = 0; i<temp.length; i++){
      var obj = {
          id:(i+2).toString(),
          label:temp[i].label.toString(),
          value:temp[i].value.toString(), 
          date:temp[i].date.toString(),
          details:temp[i].details.toString() 
      }
      newdata.push(obj);
  }
    //console.log(newdata);
    return newdata;
  }

  const callAPI = (count:number, time:Date) =>{
   
      fetch("http://localhost:3000/CMSRoutes")
        .then(res => res.text())
        .then(res => 
          {
            dataSource.data = getListFiltered(res,count,time);
            //dispatch({ type: 'FILTERALL', payload: dataSource.data});
          });
         return dataSource;

  }

export const filterAll = (count: number, time: number) => {
  let temp = "0" + String(1012021-time);
  temp = temp.substring(0,2) + "/" + temp.substring(2,4) + "/" + temp.substring(4,8);
  console.log(temp);
  var actualtime = new Date(temp);
  callAPI(count,actualtime)
    return {
        type:"FILTERALL",
        topinterval: count,
        timeinterval: time,
        payload: dataSource
    };
}

