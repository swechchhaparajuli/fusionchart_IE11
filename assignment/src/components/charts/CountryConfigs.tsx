
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";

import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

import FusionMaps from 'fusioncharts/maps/es/fusioncharts.usa';
import USA from 'fusioncharts/fusioncharts.maps';
import FakeData from '../../api/WHOAPI'
import "../../api/WHOAPI"


ReactFC.fcRoot(FusionCharts, USA, FusionMaps, FusionTheme);

// STEP 3 - Creating the JSON object to store the chart configurations
const CountryConfigs = {
  type: "maps/usa", // The chart type
  width: "100%", // Width of the chart
  dataFormat: "json", // Data type

  dataSource: {
    // Chart Configuration
    chart: {
        caption: "Country COVID Vaccination",
        theme: "fusion",
        legendposition: "BOTTOM",
        entitytooltext: "$lname: <b>$datavalue</b> vaccinations",
        legendcaption: "Number of vaccinations per day",
        entityfillhovercolor: "#FFCDD2"
    },
    colorrange: {
        gradient: "0",
        color: [
          {
            maxvalue: "50",
            displayvalue: "0-50",
            code: "#FFFEB6"
          },
          {
            maxvalue: "500",
            displayvalue: "51-500",
            code: "#6BF73C"
          },
          {
            maxvalue: "100000",
            displayvalue: "501-1000",
            code: "#33FBFF"
          },
          {
            maxvalue: "5000000000",
            displayvalue: "1001-5000",
            code: "#4533FF"
          },
          {
            maxvalue: "100000000000",
            displayvalue: "5000+",
            code: "#F73CDC"
          }
        ]
    },
    // Chart Data
    data: FakeData
  }
};

export default CountryConfigs;