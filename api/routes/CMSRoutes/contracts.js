var express = require('express');
var router = express.Router();
const axios = require('axios').default;


var fakedat = [{id:"021",value:"20000000"}, {id:"046",value:"2"}, {id:"003",value:"209850"}];


router.get('/', function(req, res, next) {
    //const url = 'https://my.api.mockaroo.com/testerd.json?key=41f2a030';
    const url = 'http://localhost:5000/src/data/CMSDummyData/cmsdummy.json'

    axios.get(url).then(response => {
        res.send(JSON.stringify(response.data.message));
    }).catch (function (error) {
        console.log(error);
        res.send(JSON.stringify([{
            "id": 12345,
            "date": "08121997",
            "company": 215721875,
            "details": 215721875
          }]));
    })
})

module.exports = router;