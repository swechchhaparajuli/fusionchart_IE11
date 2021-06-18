import React, {useState} from "react";
import {FC} from "react";

import {useDispatch, useSelector} from 'react-redux';
import { connect } from 'react-redux';
import ChartComponent from "../datadisplays/Charts";
import DetailsComponent from "../datadisplays/Details";
import {filterTime} from '../actions/filterTime'
import {filterAll} from '../actions/setFilter'
import {filterTopCount} from '../actions/filterTop15'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Component } from "react";



const CMSComponent:FC = () => {

    const dispatch = useDispatch();
    let currentChart = useSelector(state => state.displayCharts);
    let currentDetail = useSelector(state => state.displayDetails);
    let years = useSelector(state => state.yearBack);
    let numSelection = useSelector(state => state.topChoice);
    let timeSelection = useSelector(state => state.timeChoice);

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
            value: "290",
            date: "12/02/2021",
            details: "Tester Info"
          }
        ]
      };

    

    const callAPI = (count:number, time:number) =>{
        fetch("http://localhost:3000/CMSRoutes")
          .then(res => res.text())
          .then(res => 
            {
              var data = dispatch(filterAll(res,count,time));
            });
    }


    return(
    <div className="chartbody">
    <Navbar>
        
        <p>Top {numSelection} {years.chart.xaxisname}</p>
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
                                <Form.Control as="select"  onChange={e => timeSelection = e.target.value}>
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
                                <Form.Control as="select"  onChange={e => timeSelection = e.target.value}>
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
                            <Form.Control as="select"  onChange={e => numSelection = e.target.value} >
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
            {currentChart && <Col className="col-xs-auto"><ChartComponent /></Col>}
            {currentDetail && <Col className="col-xs-auto"><DetailsComponent loadedData={years.data}/></Col>}
            </Row>
        </Container>
        </div>
    )
}

export default CMSComponent;