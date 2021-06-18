

const dataSource = {
    chart: {
      caption: "   ",
      subcaption: "   ",
      xaxisname: "Companies",
      yaxisname: "Contracts",
      numbersuffix: "",
      theme: "fusion"
    },
    colorrange: {
      gradient: "0",
      color: [
        {
          maxvalue: "50",
          displayvalue: "0-50",
          code: "#FFFEB6"
        },
        {
          maxvalue: "500",
          displayvalue: "51-500",
          code: "#6BF73C"
        },
        {
          maxvalue: "100000",
          displayvalue: "501-1000",
          code: "#33FBFF"
        },
        {
          maxvalue: "5000000000",
          displayvalue: "1001-5000",
          code: "#4533FF"
        },
        {
          maxvalue: "100000000000",
          displayvalue: "5000+",
          code: "#F73CDC"
        }
      ]
  },
    data: []
  };

  const getFilteredExact = (parsedlist:string, place:string) =>{
    console.log("parsedlist");
    
    const items = JSON.parse(parsedlist).filter(item => {return (place == item.location.state)});
    console.log(items);
    dataSource.data = [];
    for (let i = 0; i<items.length; i++){
      var obj = {
          label:items[i].label.toString(),
          value:items[i].value.toString(), 
          date:items[i].date.toString(),
          details:items[i].details.toString(),
          id: items[i].location.state.toString()
      }
      dataSource.data.push(obj);
  }
    //console.log(newdata);
    return dataSource;
  }

export const usStateFilter = (loadeddata, place:string) => {
    return{
        type:"FILTERLOCATION",
        payload: getFilteredExact(loadeddata,place)
    }
}

