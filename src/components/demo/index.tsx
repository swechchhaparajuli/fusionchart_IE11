import React, {useState} from "react";
import {FC} from "react";
import {useDispatch, useSelector} from 'react-redux';
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

const CMSComponent:FC = () => {

    const dispatch = useDispatch();
    let currentChart = useSelector(state => state.displayCharts);
    let currentDetail = useSelector(state => state.displayDetails);

    let numSelection = 30;
    let timeSelection = 30;

/*    const stateshift = (numSelection: number, timeSelection: number) =>{
        dispatch(filterTopCount(numSelection));
        dispatch(filterTime(timeSelection));
    }*/

    return(
        <div >
            <h1>HERE: CHART: {currentChart.toString()}  GRAPH: {currentDetail.toString()}</h1>
    <Navbar className="bg-light justify-content-end">
        <Form>
            <Row>
            <Col>
            <Form.Label>
                Year
            </Form.Label>
            </Col>
            <Col>
            <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Control as="select"  onChange={e => timeSelection = e.target.value}>
            <option value={1} >Past Year</option>
            <option value={2} >Past Two Years</option>
            <option value={10} >Past Ten Years</option>
            </Form.Control>
            </Form.Group>
            </Col>
        

            <Col>
            <Form.Label>
                Top Count
            </Form.Label>
            </Col>
            <Col>
            <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Control as="select" onChange={e => numSelection = e.target.value} >
            <option value={10} >Top Ten</option>
            <option value={15} >Top 15</option>
            <option value={30} >All</option>
            </Form.Control>
            </Form.Group>
            </Col>
            <Col>
            <Button onClick={() => dispatch(filterTopCount(numSelection))}>FILTER</Button> 
            </Col>
            </Row>
        </Form> 

    </Navbar>
        <h1>CMS COMPONENT</h1>  
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