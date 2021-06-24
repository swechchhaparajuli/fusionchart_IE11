import React, {useState} from "react";
import {FC} from "react";


// Redux
import {useDispatch, useSelector} from 'react-redux';
import {displayType} from '../actions/graphsDisplay'

//Child Components
import TopComponent from './YearTopSortBar'


// React-Bootstrap 
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';




var changeLabel = (val: string) =>{
  
    var config = {
    chart : {
        caption: "Vaccines Per " + val,
        theme: "candy",
        legendposition: "BOTTOM",
        entitytooltext: "$lname: <b>$datavalue </b> vaccines",
        legendcaption: "Vaccines Per " + val,
        entityfillhovercolor: " Vaccines"
    }
    };
    return config;
}

const dataSource = {
    chart: {
      caption: "Countries With Most Oil Reserves [2017-18]",
      subcaption: "In MMbbl = One Million barrels",
      xaxisname: "Country",
      yaxisname: "Reserves (MMbbl)",
      numbersuffix: "K",
      theme: "fusion"
    },
    data: [
      {
        label: "Venezuela",
        value: "290"
      }
    ]
  };

//const env = process.env.NODE_ENV;
// <h1>{env}</h1>

const GraphChartBar:FC = () => {

    const [chart, setChart] = useState(true); 
    const [grid, setGrid] = useState(true);

    return(
        <div >
            <Navbar className="bg-light">
                <Container className="justify-content-end">
            <Form>
                    
                    <Form.Group controlId="formBasicCheckbox">
                    <Row>
                    <Col className="col-sm-auto">
                        <Form.Check onChange={() => {setChart(!chart)}} checked={chart} type="checkbox" label="Graph" />
                    </Col>
                    <Col className="col-sm-auto">
                        <Form.Check onChange={() =>  {setGrid(!grid)}} checked={grid} type="checkbox" label="Data List" />
                    </Col>
                    </Row>
                        </Form.Group>
            </Form>
            </Container>
            </Navbar>

            <TopComponent showDetail={grid} showChart={chart}/>
            </div>
    )
}

export default GraphChartBar;