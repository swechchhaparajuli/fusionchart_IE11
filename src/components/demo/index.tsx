import React, {useState} from "react";
import {FC} from "react";
import {useDispatch, useSelector} from 'react-redux';
import { connect } from 'react-redux';
import ChartComponent from "./Charts";
import DetailsComponent from "./Details";
import {filterTime} from './actions/filterTime'
import {filterAll} from './actions/setFilter'
import {filterTopCount} from './actions/filterTop15'
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

    let numSelection = useSelector(state => state.topChoice);
    let timeSelection = useSelector(state => state.timeChoice);

    const action1 = (numSel: number, timeSel: number) => {
        /*dispatch(filterTime(timeSel));
        dispatch(filterTopCount(numSel));
        console.log("NUM" + numSel);
        console.log("TIME" + timeSel);*/
        dispatch(filterAll(numSel,timeSel));
        console.log("TIME" + timeSel);
        console.log("NUM" + numSel);

      }



    return(
        <div className="chartbody">
    <Navbar>
    <Container className="justify-content-end ">
        <Form>
            <Row>
                <Col className="col-md-auto">
                    <Container>
                    <Row>
                        <Col className="col-md-auto formlabel">
                            <Form.Label>Year</Form.Label>
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
                <Col className="col-md-auto">
                    <Container>
                    <Row>
                    <Col className="col-md-auto">
                        <Form.Label> Top Count </Form.Label>
                    </Col>
                    <Col className="col-md-auto">
                        <Form.Group controlId="exampleForm.ControlSelect1">
                            <Form.Control as="select"  onChange={e => numSelection = e.target.value} >
                            <option value={10} >Top Ten</option>
                            <option value={15} >Top 15</option>
                            <option value={30} >All</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    </Row>
                    </Container>
                </Col>
                <Col className="col-md-auto"> 
                    {<Button onClick={() => action1(numSelection,timeSelection)}>FILTER</Button>}
                </Col>
            </Row>
        </Form> 
        </Container>
    </Navbar>
        <Container fluid>
            <Row>
            {currentChart && <Col ><ChartComponent /></Col>}
            {currentDetail && <Col ><DetailsComponent /></Col>}
            </Row>
        </Container>
        </div>
    )
}

export default CMSComponent;