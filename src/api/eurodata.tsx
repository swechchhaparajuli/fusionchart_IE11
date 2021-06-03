
import axios from 'axios';


import 'jquery-fusioncharts';


var EuroData = [{id:"021",value:"20000000"}, {id:"046",value:"2"}, {id:"003",value:"209850"}];

let PrintData = () => {
    console.log(EuroData);
}

async function EurData(){
    console.log("START FETCH");
    //const url = 'https://my.api.mockaroo.com/fake_vacc.json?key=41f2a030';

    try {
            const resp = await axios.get('./src/data/eurod.json')
            console.log("data: ");
            console.log(resp.data);
            for (let i = 0; i<resp.data.length; i++){
                var eurid = "0";
                if(resp.data[i].id<10){
                    eurid = "00" + resp.data[i].id.toString();
                } else if(resp.data[i].id<100){
                    eurid = "0" + resp.data[i].id.toString();
                } else {
                    eurid = resp.data[i].id.toString();
                }
                var obj = {
                    id:eurid,
                    value:resp.data[i].vaccinated.toString()
                };
                EuroData.push(obj);
            }
            PrintData();
        } catch (error) {
            console.log(error);
        }
    return EuroData;
}

EurData();

export default EuroData;