"use strict";
// const debug = require("debug")("express:server");

const express = require('express');
let app = express();
const autodocApi = require('./autodocApi');

app.use('/api/:detailNumber', async (req: any, res: any) => {
    const detailNumber = req.params["detailNumber"];
    console.log('back detailNumber');
    const autodocGeneralSearch: Array<any> | null = await autodocApi.generalSearch(detailNumber);
    res.send(JSON.stringify(autodocGeneralSearch));

    // autodocGeneralSearch.then(autoRes => {
    //     res.send(JSON.stringify(autoRes));
    // })

   
});

app.listen(3000);