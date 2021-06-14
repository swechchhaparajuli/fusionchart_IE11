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
      },
      {
        label: "Saudi",
        value: "260"
      },
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

