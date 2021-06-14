

// state # of highest values
const displayGraph = (state = true, action) => {
    switch (action.type){
        case "GRID":
            return !state
        case "GRIDCHART":
            return state
        default:
            return state;
    }
}

export default displayGraph;