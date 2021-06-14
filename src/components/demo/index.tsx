import React, {useState} from "react";
import {FC} from "react";
import {useDispatch, useSelector} from 'react-redux';
import { connect } from 'react-redux';
import ChartComponent from "./chart";
import DetailsComponent from "./details";
import {filterTime} from './actions/filterTime'
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
    const datasource = useSelector(state => state.choiceName);

    let numSelection = datasource;
    let timeSelection = datasource;

    const action1 = (numSel: number, timeSel: number) => {
          dispatch(filterTopCount(numSel));
          console.log("NUM" + numSel);
          dispatch(filterTime(timeSel));
          console.log("TIME" + timeSel);
      }

    
      



/*    const stateshift = (numSelection: number, timeSelection: number) =>{
        dispatch(filterTopCount(numSelection));
        dispatch(filterTime(timeSelection));
    }*/

    return(
        <div className="chartbody">
    <Navbar>
    <Container>{currentChart && <p>Chart by {datasource}</p>}</Container>
    <Container className="justify-content-end ">
        <Form>
            <Row>
                <Col className="col-sm-auto">
                    <Container>
                    <Row>
                        <Col className="col-sm-auto formlabel">
                            <Form.Label>Year</Form.Label>
                        </Col>
                        <Col className="col-sm-auto">
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
                    <Col className="col-sm-auto">
                        <Form.Label> Top Count </Form.Label>
                    </Col>
                    <Col className="col-sm-auto">
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
                    <Col> 
                        {<Button onClick={() => action1(numSelection,timeSelection)}>FILTER</Button>}
                    </Col>
                
            </Row>
        </Form> 
        </Container>
    </Navbar>
        <Container fluid>
            <Row>
            {currentChart && <Col><ChartComponent /></Col>}
            {currentDetail && <Col><DetailsComponent /></Col>}
            </Row>
        </Container>
        </div>
    )
}

export default CMSComponent;