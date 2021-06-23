import React, {useState, useEffect, useRef} from "react";
import {FC} from "react";

import {useDispatch, useSelector} from 'react-redux';
import { connect } from 'react-redux';
import ChartComponent from "../datadisplays/Charts";
import DetailsComponent from "../datadisplays/Details";


import {filterTopCount} from '../actions/filterTop15'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Component } from "react";

let dataSource = {
    chart: {
      caption: "   ",
      subcaption: "   ",
      xaxisname: "Companies",
      yaxisname: "Contracts",
      numbersuffix: "",
      theme: "fusion"
    },
    data: []
  };

const getListFiltered = (parsedlist:string, count:number, time:Date) =>{
    const items = JSON.parse(parsedlist).filter(item => {var temp = new Date(item.date); return temp>time}).sort((a,b) => 0 - (parseInt(a.value) > parseInt(b.value) ? -1 : 1));
    const temp = items.slice(0,count);
    //console.log(temp);
    
    var data = [];
    for (let i = 0; i<temp.length; i++){
      var obj = {
          label:temp[i].label.toString(),
          value:temp[i].value.toString(), 
          date:temp[i].date.toString(),
          details:temp[i].details.toString(),
          project_id: (i+1).toString()
      }
      data.push(obj);
  }
    //console.log(newdata);
    return data;
  }



const getFilteredExact = (parsedlist:string, count:number, time:Date) =>{
    const items = JSON.parse(parsedlist).filter(item => {var temp = new Date(item.date); return (temp.getUTCFullYear()==time.getUTCFullYear())}).sort((a,b) => 0 - (parseInt(a.value) > parseInt(b.value) ? -1 : 1));
    const temp = items.slice(0,count);
  
    var data = [];
    for (let i = 0; i<temp.length; i++){
      var obj = {
          label:temp[i].label.toString(),
          value:temp[i].value.toString(), 
          date:temp[i].date.toString(),
          details:temp[i].details.toString(),
          project_id: (i+1).toString()
      }
      data.push(obj);
  }
    //console.log(newdata);
    return data;
  }

const filterAll = (loadeddata, count: number, time: number) => {

    if(time>100){
      let temp = String(time);
      temp = "01/01/" + temp;
      var actualtime = new Date(temp);

      return getFilteredExact(loadeddata,count,actualtime);

    } else {
      let temp = "0" + String(1012021-time);
      temp = temp.substring(0,2) + "/" + temp.substring(2,4) + "/" + temp.substring(4,8);
      var actualtime = new Date(temp);
      return getListFiltered(loadeddata,count,actualtime)
    }
}



const TopComponent:FC<{showChart, showDetail}> = (display) => {

    //const dispatch = useDispatch();
    //let currentChart = useSelector(state => state.displayCharts);
    //let currentDetail = useSelector(state => state.displayDetails);

    const [years, setYear] = useState();
    const [numSelection, setTopNum] = useState(15);
    const [timeSelection, setTime] = useState(30);

    const callAPI = (count:number, time:number) =>{
        var data = [];
        fetch("http://localhost:3000/TopFifteen")
          .then(res => res.text())
          .then(res => 
            {
              data = filterAll(res,count,time);
              setYear(data);
            });
        //console.log(years);
    }

    const isBaseMounted = useRef(false);
    useEffect(() => {
        isBaseMounted.current = true;
        if(years == undefined){
          console.log("FETCH BASE");
          console.log(years);
          callAPI(15,30);
        
        }
           //FusionCharts.addEventListener('entityRollOut', setColor);
        return () => {isBaseMounted.current = false};
      },[years]);

    //let years = useSelector(state => state.yearBack);
    //let numSelection = useSelector(state => state.topChoice);
    //let timeSelection = useSelector(state => state.timeChoice);


    return(
    <div className="chartbody">
    <Navbar>
        
        <p>Top {numSelection} Clients</p>
    <Container className="justify-content-end ">
        <Form>
            <Container>
            <Row>
                <Col className="col-sm-auto" style={{padding: 0}}>
                    <Container>
                    <Row>
                        <Col className="col-md-auto formlabel">
                            <Form.Label>Year</Form.Label>
                        </Col>
                        <Col className="col-md-auto">
                            <Form.Group controlId="exampleForm.ControlSelect1">
                                <Form.Control as="select"  onChange={e => setTime(parseInt(e.target.value))}>
                                    <option value={30} ></option>
                                    <option value={2021} >2021</option>
                                    <option value={2020} >2020</option>
                                    <option value={2019} >2019</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>
                    </Container>
                </Col>
                <Col className="col-sm-auto">
                    <Container>
                    <Row>
                        <Col className="col-md-auto formlabel">
                            <Form.Label>Year Back</Form.Label>
                        </Col>
                        <Col className="col-md-auto">
                            <Form.Group controlId="exampleForm.ControlSelect1">
                                <Form.Control as="select"  onChange={e => setTime(parseInt(e.target.value))}>
                                    <option value={30} ></option>
                                    <option value={1} >Past Year</option>
                                    <option value={2} >Past Two Years</option>
                                    <option value={10} >Past Ten Years</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>
                    </Container>
                </Col>
                <Col className="col-sm-auto">
                    <Container>
                    <Row>
                    <Col className="col-md-auto">
                        <Form.Label> Top Count </Form.Label>
                    </Col>
                    <Col className="col-md-auto">
                        <Form.Group controlId="exampleForm.ControlSelect1">
                            <Form.Control as="select"  onChange={e => setTopNum(parseInt(e.target.value))} >
                            <option value={15} > </option>
                            <option value={30} >Top 30</option>
                            <option value={15} >Top 15</option>
                            <option value={10} >Top Ten</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    </Row>
                    </Container>
                </Col>
                <Col className="col-md-auto"> 
                    {<Button onClick={() =>  callAPI(numSelection,timeSelection)}>FILTER</Button>}
                </Col>
            </Row>
            </Container>
        </Form> 
        </Container>
    </Navbar>
        <Container fluid>
            <Row>
            {display.showChart && <Col className="col-xs-auto"><ChartComponent loadedData={years}/></Col>}
            {display.showDetail && <Col className="col-xs-auto"><DetailsComponent loadedData={years}/></Col>}
            </Row>
        </Container>
        </div>
    )
}

export default TopComponent;