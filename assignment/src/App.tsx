import React, {FC} from "react";
import ReactDOM from "react-dom";
import ReactFC from "react-fusioncharts";
import "./styles.scss";
import chartConfigs from './components/chartConfigs'


const App: FC = () => {
    const env = process.env.NODE_ENV
    return(
        <div>
            <h1>{env}</h1>
            <p>Bar Graph Test:</p>
            <ReactFC {...chartConfigs} />
        </div>
    )
}

export default App;