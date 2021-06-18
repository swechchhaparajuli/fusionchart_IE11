


// state # of highest values
const topChoiceName = (state = 15, action) => {
    switch (action.type){
        case "TOPCOUNT":
            return action.topinterval
        case "FILTERALL":
            return action.topinterval
        default:
            return state;
    }
}

export default topChoiceName;