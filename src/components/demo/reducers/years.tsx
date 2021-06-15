
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

  const getListFiltered = (parsedlist:string, count:number, time:Date) =>{
    const items = JSON.parse(parsedlist).filter(item => {var temp = new Date(item.date); return temp>time}).sort((a,b) => 0 - (parseInt(a.value) > parseInt(b.value) ? -1 : 1));
    const temp = items.slice(0,count);
    console.log(temp);
    var newdata = [{label:"Test", value:"1000"}];
    for (let i = 0; i<temp.length; i++){
      var obj = {
          label:temp[i].label.toString(),
          value:temp[i].value.toString()    
      }
      newdata.push(obj);
  }
    //console.log(newdata);
    return newdata;
  }

  const callAPI = (count:number, time:number) =>{
    fetch("http://localhost:3000/CMSRoutes")
      .then(res => res.text())
      .then(res => 
        {
            dataSource.data = getListFiltered(res,count,time);
        });
        return dataSource;
  }


// state == num years to go back to from 2021
const  yearBackReducer= (state = 10, action) => {
    switch (action.type){
        case "TIME":
            return action.payload
        case "TOPCOUNT":
            return action.payload
        case "FILTERALL":
            return action.payload
        default:
            return callAPI(state,state);
    }
}

export default yearBackReducer;