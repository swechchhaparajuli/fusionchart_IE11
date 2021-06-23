var express = require('express');
var router = express.Router();
const axios = require('axios').default;


var fakedat = [{id:"021",value:"20000000"}, {id:"046",value:"2"}, {id:"003",value:"209850"}];


router.get('/', function(req, res, next) {
    //const url = 'https://my.api.mockaroo.com/testerd.json?key=41f2a030';
    const url = 'http://localhost:5000/src/data/CMSDummyData/cmsdummy.json'

    axios.get(url).then(response => {
        var newdata = [];
        
        for (let i = 0; i<response.data.length; i++){
            var obj = {
                label:response.data[i].Project_desc.toString(),
                value:response.data[i].Contract$.toString(),
                date:response.data[i].AwardDate.toString(),
                details:response.data[i].Project_desc.toString(),
                completion:response.data[i].Complete.toString(),
                contact: {name: response.data[i].Contact_info.Name.toString(), info: response.data[i].Contact_info.Cell.toString()},
                id:response.data[i].id.toString(),
                location:{state: response.data[i].Location.State.toString(), county: response.data[i].Location.County.toString()}
            }
            newdata.push(obj);
        }
        res.send(JSON.stringify(newdata));
    }).catch (function (error) {
        console.log(error);
        res.send(JSON.stringify([]));
    })
})

module.exports = router;