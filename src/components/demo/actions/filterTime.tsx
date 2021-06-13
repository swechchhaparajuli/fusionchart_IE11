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

  const callAPI = () =>{
    fetch("http://localhost:3000/testAPI")
      .then(res => res.text())
      .then(res => 
        {
            dataSource.data = JSON.parse(res);
            console.log(JSON.parse(res));
        });
        return dataSource;
  }

export const filterTime = (time:number) => {
    return {
        type:"TIME",
        interval: time,
        payload: callAPI()
    };
}

