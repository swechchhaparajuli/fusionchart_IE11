
// state == num years to go back to from 2021
const  yearBackReducer= (state = 0, action) => {
    switch (action.type){
        case "TIME":
            return action.payload
        default:
            return state;
    }
}

export default yearBackReducer;