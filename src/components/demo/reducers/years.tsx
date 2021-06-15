
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
  const items = JSON.parse(parsedlist).filter(item => {var temp = new Date(item.date); return temp<time}).sort((a,b) => 0 - (parseInt(a.value) > parseInt(b.value) ? -1 : 1));
  const temp = items.slice(0,count);
  var newdata = [{label:"Test", value:"1000", date:"08/12/1997", details:"Test dummy ", }];
  for (let i = 0; i<temp.length; i++){
    var obj = {
        id:(i+2).toString(),
        label:temp[i].label.toString(),
        value:temp[i].value.toString(), 
        date:temp[i].date.toString(),
        details:temp[i].details.toString() 
    }
    newdata.push(obj);
}
  //console.log(newdata);
  return newdata;
}

const callAPI = (count:number, time:Date) =>{
 
    fetch("http://localhost:3000/CMSRoutes")
      .then(res => res.text())
      .then(res => 
        {
          dataSource.data = getListFiltered(res,count,time);
          //dispatch({ type: 'FILTERALL', payload: dataSource.data});
        });
        console.log(dataSource);
       return dataSource;
}
  

// state == num years to go back to from 2021
const  yearBackReducer= (state = 15, action) => {
  var date = new Date("01/01/2021");
    switch (action.type){
        case "TIME":
            return action.payload
        case "TOPCOUNT":
            return action.payload
        case "FILTERALL":
            return action.payload
        default:
            dataSource.data = [];
            return callAPI(state,date);
    }
}

export default yearBackReducer;