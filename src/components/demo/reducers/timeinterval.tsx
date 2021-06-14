
// state # of highest values
const timeChoiceName = (state = 0, action) => {
    switch (action.type){
        case "TIME":
            return action.timeinterval
        case "FILTERALL":
            return action.timeinterval
        default:
            return state;
    }
}

export default timeChoiceName;