


// state # of highest values
const topChoiceName = (state = 0, action) => {
    switch (action.type){
        case "TOPCOUNT":
            return action.topinterval
        default:
            return state;
    }
}

export default topChoiceName;