import React, {useState} from "react";
import {FC} from "react";

import "./styles.scss";
import CandyTheme from "fusioncharts/themes/fusioncharts.theme.candy";
import EuroChart from "./components/charts/EuroChart"

import MyMaps from "./components/charts/index"
import ContinentConfigs from "./components/charts/ContinentConfigs"
import CountryConfigs from "./components/charts/CountryConfigs"
import {useDispatch, useSelector} from 'react-redux';
import {displayType} from './components/demo/actions/graphsDisplay'
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CMSComponent from "./components/demo/index"


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

//const env = process.env.NODE_ENV;
// <h1>{env}</h1>

const App:FC = () => {

    const [chart, setState] = useState(changeLabel("Annee")); 
    const dispatch = useDispatch();

    return(
        <div >
            <Navbar className="bg-light">
                <Container className="justify-content-end">
            <Form>
                    
                    <Form.Group controlId="formBasicCheckbox">
                    <Row>
                    <Col className="col-sm-auto">
                        <Form.Check onChange={() => {dispatch(displayType("CHART"))}} checked={useSelector(state => state.displayCharts)} type="checkbox" label="Graph" />
                    </Col>
                    <Col className="col-sm-auto">
                        <Form.Check onChange={() => {dispatch(displayType("GRID"))}} checked={useSelector(state => state.displayDetails)} type="checkbox" label="Data List" />
                    </Col>
                    </Row>
                        </Form.Group>
            </Form>
            </Container>
            </Navbar>
           
            <CMSComponent />
            {/*<MyMaps /> */}
            {/* <button onClick={() => setState(changeLabel("Day"))}> Day Label </button>
            <button onClick={() => setState(changeLabel("Month"))}> Month Label </button>
            <EuroChart dtype={chart}/>
            <CountryConfigs dtype={chart}/>
            <ContinentConfigs dtype={chart}/> */}
        </div>
    )
}

export default App;