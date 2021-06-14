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

  const getListFiltered = (parsedlist:string, count:number) =>{
    const items = JSON.parse(parsedlist).sort().slice(0,count);
    console.log(items);
    return items;
  }

  const callAPI = (count:number) =>{
    fetch("http://localhost:3000/testAPI")
      .then(res => res.text())
      .then(res => 
        {
            dataSource.data = getListFiltered(res,count);
        });
        return dataSource;
  }

export const filterTopCount = (count: number) => {
    return {
        type:"TOPCOUNT",
        interval: count,
        payload: callAPI(count)
    };
}

