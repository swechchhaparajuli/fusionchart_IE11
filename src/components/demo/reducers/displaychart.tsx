

// state # of highest values
const displayChart = (state = true, action) => {
    switch (action.type){
        case "CHART":
            return !state && action.chart
        case "GRIDCHART":
            return !state && action.chart
        default:
            return state;
    }
}

export default displayChart;