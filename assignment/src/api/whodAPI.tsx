
import axios from 'axios';


import 'jquery-fusioncharts';


import FakeData from './WHOAPI';

var FakeDataD = [{id:"CA",value:"200"}, {id:"MN",value:"2080"}, {id:"TX",value:"209850"}];


let PrintData = () => {
    console.log(FakeDataD);
}

async function VaxData(){
    console.log("START FETCH");
    const url = 'https://my.api.mockaroo.com/fake_vacc.json?key=41f2a030';

    try {
            const resp = await axios.get(url)
            console.log("data: ");
            console.log(resp.data);
            for (let i = 0; i<resp.data.length; i++){
                var obj = {id:resp.data[i].country,value:resp.data[i].vaccinated.toString()};
                FakeDataD.push(obj);
            }
            PrintData();
        } catch (error) {
            console.log(error);
        }
    return FakeDataD;
}

VaxData();

export default FakeDataD;