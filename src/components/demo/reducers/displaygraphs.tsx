

// state # of highest values
const displayGraph = (state = true, action) => {
    switch (action.type){
        case "GRID":
            return !state && action.grid
        case "GRIDCHART":
            return !state && action.grid
        default:
            return state;
    }
}

export default displayGraph;