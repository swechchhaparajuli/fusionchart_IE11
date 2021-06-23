import React, {useState} from "react";
import {FC} from "react";




import {useDispatch, useSelector} from 'react-redux';
import {displayType} from '../actions/graphsDisplay'
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

    const [chart, setState] = useState(changeLabel("Annee")); 


    
    const dispatch = useDispatch();

    let years = useSelector(state => state.yearBack);


    const callAPI = (type:string) =>{
        var data = dispatch(displayType(type, years));
    }


    return(
        <div >
            <Navbar className="bg-light">
                <Container className="justify-content-end">
            <Form>
                    
                    <Form.Group controlId="formBasicCheckbox">
                    <Row>
                    <Col className="col-sm-auto">
                        <Form.Check onChange={() => {callAPI("CHART")}} checked={useSelector(state => state.displayCharts)} type="checkbox" label="Graph" />
                    </Col>
                    <Col className="col-sm-auto">
                        <Form.Check onChange={() =>  {callAPI("GRID")}} checked={useSelector(state => state.displayDetails)} type="checkbox" label="Data List" />
                    </Col>
                    </Row>
                        </Form.Group>
            </Form>
            </Container>
            </Navbar>
            </div>
    )
}

export default GraphChartBar;