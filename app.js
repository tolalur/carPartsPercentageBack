"use strict";
const debug = require("debug")("express:server");
const express = require('express');
let app = express();
const autodocApi = require('./autodocApi').req;



app.use('/api/:detailNumber', (req, res) => {
    const detailNumber = req.params["detailNumber"];
    console.log('back detailNumber');
    const autodocData = autodocApi(detailNumber);
    
    autodocData.then(autoRes => {
        res.send(JSON.stringify(autoRes));
    })

   
});

app.listen(3000);