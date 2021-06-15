

const dataSource = {
    chart: {
      caption: "   ",
      subcaption: "   ",
      xaxisname: "Companies",
      yaxisname: "Contracts",
      numbersuffix: "",
      theme: "fusion"
    },
    data: []
  };

  const getListFiltered = (parsedlist:string, count:number, time:Date) =>{
    const items = JSON.parse(parsedlist).filter(item => {var temp = new Date(item.date); return temp>time}).sort((a,b) => 0 - (parseInt(a.value) > parseInt(b.value) ? -1 : 1));
    const temp = items.slice(0,count);
    console.log(temp);
    
    dataSource.data = [];
    for (let i = 0; i<temp.length; i++){
      var obj = {
          id:(i+2).toString(),
          label:temp[i].label.toString(),
          value:temp[i].value.toString(), 
          date:temp[i].date.toString(),
          details:temp[i].details.toString() 
      }
      dataSource.data.push(obj);
  }
    //console.log(newdata);
    return dataSource;
  }

  const getFilteredExact = (parsedlist:string, count:number, time:Date) =>{
    const items = JSON.parse(parsedlist).filter(item => {var temp = new Date(item.date); return (temp.getUTCFullYear()==time.getUTCFullYear())}).sort((a,b) => 0 - (parseInt(a.value) > parseInt(b.value) ? -1 : 1));
    const temp = items.slice(0,count);
  
    dataSource.data = [];
    for (let i = 0; i<temp.length; i++){
      var obj = {
          id:(i+2).toString(),
          label:temp[i].label.toString(),
          value:temp[i].value.toString(), 
          date:temp[i].date.toString(),
          details:temp[i].details.toString() 
      }
      dataSource.data.push(obj);
  }
    //console.log(newdata);
    return dataSource;
  }

export const filterAll = (loadeddata, count: number, time: number) => {
  
  if(time>100){
    let temp = String(time);
    temp = "01/01/" + temp;
    console.log(temp);
    var actualtime = new Date(temp);
    console.log(actualtime.getFullYear());
    return{
      type:"FILTERALL",
      topinterval: count,
      timeinterval: time,
      payload: getFilteredExact(loadeddata,count,actualtime)
    }
  } else {
    let temp = "0" + String(1012021-time);
    temp = temp.substring(0,2) + "/" + temp.substring(2,4) + "/" + temp.substring(4,8);
    console.log(temp);
    var actualtime = new Date(temp);
      return {
          type:"FILTERALL",
          topinterval: count,
          timeinterval: time,
          payload: getListFiltered(loadeddata,count,actualtime)
      };
  }
}

