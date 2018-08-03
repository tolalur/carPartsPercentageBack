"use strict";
// const debug = require("debug")("express:server");

const express = require('express');
let app = express();
const autodocApi = require('./autodocApi');

app.use('/api/general/:detailNumber', async (req: any, res: any) => {
    const detailNumber = req.params["detailNumber"];
    const response = { autodoc: [], exist: [] };

    console.log('back general search');
    response.autodoc = await autodocApi.generalSearch(detailNumber);

    res.send(JSON.stringify(response));   
});

app.use('/api/target/:detailNumber/:id', async (req: any, res: any) => {
    const detailNumber = req.params["detailNumber"];
    console.log('back general search');
    const autodocGeneralSearch: Array<any> | null = await autodocApi.generalSearch(detailNumber);
    res.send(JSON.stringify(autodocGeneralSearch));   
});

app.listen(3000);