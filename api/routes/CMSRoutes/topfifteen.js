var express = require('express');
var router = express.Router();
const axios = require('axios').default;


var fakedat = [{id:"021",value:"20000000"}, {id:"046",value:"2"}, {id:"003",value:"209850"}];


router.get('/', function(req, res, next) {
    //const url = 'https://my.api.mockaroo.com/testerd.json?key=41f2a030';
    const url = 'http://localhost:5000/src/data/CMSDummyData/cmsdummy.json'

    axios.get(url).then(response => {
        var newdata = [{label:"Test", value:"1000"}];
        
        for (let i = 0; i<response.data.length; i++){
            var obj = {
                label:response.data[i].company.toString(),
                value:response.data[i].value.toString(),
                date:response.data[i].date.toString(),
                details:response.data[i].details.toString(),
                id:response.data[i].id.toString()
                
            }
            newdata.push(obj);
        }
        res.send(JSON.stringify(newdata));
    }).catch (function (error) {
        console.log(error);
        res.send(JSON.stringify([{
            "id": 12345,
            "date": "08121997",
            "value": 20392910,
            "company": 215721875,
            "details": 215721875
          }]));
    })
})

module.exports = router;