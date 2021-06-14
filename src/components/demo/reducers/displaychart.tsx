

// state # of highest values
const displayChart = (state = true, action) => {
    switch (action.type){
        case "CHART":
            return !state
        case "GRIDCHART":
            return state
        default:
            return state;
    }
}

export default displayChart;