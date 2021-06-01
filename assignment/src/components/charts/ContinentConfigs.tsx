
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";

import CandyTheme from 'fusioncharts/themes/fusioncharts.theme.candy';

import FusionMaps from 'fusioncharts/maps/es/fusioncharts.world';
import World from 'fusioncharts/fusioncharts.maps';
import chartData from '../../api/ContinentData';

ReactFC.fcRoot(FusionCharts, World, FusionMaps, CandyTheme);

// STEP 3 - Creating the JSON object to store the chart configurations
const ContinentConfigs = {
  type: "maps/world", // The chart type
  width: "100%", // Width of the chart
  dataFormat: "json", // Data type

  dataSource: {
    // Chart Configuration
    chart: {
        caption: "Continent COVID Vaccination",
        theme: "candy",
        legendposition: "BOTTOM",
        entitytooltext: "$lname: <b>$datavalue </b> vaccines",
        legendcaption: "Number of vaccinations per day",
        entityfillhovercolor: "#FFCDD2"
    },
    colorrange: {
        gradient: "0",
        color: [
          {
            maxvalue: "50",
            displayvalue: "0-50",
            code: "#EF9A9A"
          },
          {
            maxvalue: "500",
            displayvalue: "51-500",
            code: "#EF5350"
          },
          {
            maxvalue: "1000",
            displayvalue: "501-1000",
            code: "#E53935"
          },
          {
            maxvalue: "5000",
            displayvalue: "1001-5000",
            code: "#C62828"
          },
          {
            maxvalue: "10000",
            displayvalue: "5000+",
            code: "#FFEBEE"
          }
        ]
    },
    // Chart Data
    data: chartData
  },
};

export default ContinentConfigs;