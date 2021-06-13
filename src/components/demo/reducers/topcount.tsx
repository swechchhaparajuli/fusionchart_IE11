// state # of highest values
const topCountReducer = (state = 0, action) => {
    switch (action.type){
        case "TOPCOUNT":
            return action.payload
        default:
            return state;
    }
}

export default topCountReducer;