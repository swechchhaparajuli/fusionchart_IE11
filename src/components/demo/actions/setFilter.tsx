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
        label: "Venezuela",
        value: "290"
      }
    ]
  };

  const getListFiltered = (parsedlist:string, count:number, time:number) =>{
    const items = JSON.parse(parsedlist).filter(item => item.date<time).sort().slice(0,count);
    var newdata = [{label:"Test", value:"1000"}];
    for (let i = 0; i<items.length; i++){
      var obj = {
          label:items[i].label.toString(),
          value:items[i].value.toString()    
      }
      newdata.push(obj);
  }
    console.log(newdata);
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

export const filterAll = (count: number, time: number) => {
    return {
        type:"FILTERALL",
        topinterval: count,
        timeinterval: time,
        payload: callAPI(count,1010000+time)
    };
}

