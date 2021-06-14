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
        value: "29"
      }
    ]
  };

  const getListFiltered = (parsedlist:string, time:number) =>{
    const items = JSON.parse(parsedlist).filter(item => item.value>time);
    return items;
  }

  const callAPI = (time:number) =>{
    fetch("http://localhost:3000/testAPI")
      .then(res => res.text())
      .then(res => 
        {
            dataSource.data = getListFiltered(res,time);
            console.log(JSON.parse(res));
        });
        return dataSource;
  }

export const filterTime = (time:number) => {
    return {
        type:"TIME",
        interval: time,
        payload: callAPI(229946794-time)
    };
}

