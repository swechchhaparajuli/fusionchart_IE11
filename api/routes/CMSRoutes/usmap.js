var express = require('express');
var router = express.Router();
const axios = require('axios').default;




router.get('/', function(req, res, next) {
    //const url = 'https://my.api.mockaroo.com/testerd.json?key=41f2a030';
    const url = 'http://localhost:5000/src/data/CMSDummyData/state_nclients.json'

    axios.get(url).then(response => {
        var newdata = [{label:"ND", value:"1000"}]
        
        for (let i = 0; i<response.data.length; i++){
            var obj = {
                label:response.data[i].state.toString(),
                value:response.data[i].nclients.toString()
            }
            newdata.push(obj);
        }
        res.send(JSON.stringify(newdata));
    }).catch (function (error) {
        console.log(error);
        res.send(JSON.stringify([{
            "label": "CA",
            "value": 20392910
          },
          {
            "label": "TX",
            "value": 2
          }]));
    })
})

module.exports = router;