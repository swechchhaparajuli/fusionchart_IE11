
const dataSource = {
    chart: {
      caption: "Countries With Most Oil Reserves [2017-18]",
      subcaption: "In MMbbl = One Million barrels",
      xaxisname: "Country",
      yaxisname: "Reserves (MMbbl)",
      numbersuffix: "K",
      theme: "fusion"
    },
    data: [
      {
        label: "Canada",
        value: "180"
      },
      {
        label: "Iran",
        value: "140"
      },
      {
        label: "Russia",
        value: "115"
      },
      {
        label: "UAE",
        value: "100"
      },
      {
        label: "US",
        value: "30"
      },
      {
        label: "China",
        value: "30"
      }
    ]
  };

  const combine = (incomingload, existingload) =>{
      if(incomingload != 0) existingload.data.push(incomingload);
      return existingload;
  }


// state == num years to go back to from 2021
const  yearBackReducer= (state = 0, action) => {
    switch (action.type){
        case "TIME":
            return action.payload
        case "TOPCOUNT":
            //return combine(state,action.payload);
            return action.payload
        default:
            return dataSource;
    }
}

export default yearBackReducer;