"use strict";
// const debug = require("debug")("express:server");

const express = require('express');
let app = express();
const autodocApi = require('./autodocApi');
const existApi = require('./existApi');

app.use('/api/general/:detailNumber', async (req: any, res: any) => {
    console.log('back general search');

    const detailNumber = req.params["detailNumber"];
    const response = { autodoc: [], exist: [] };

    response.autodoc = await autodocApi.generalSearch(detailNumber);
    response.exist = await existApi.generalSearch(detailNumber);

    res.send(JSON.stringify(response));
});

app.use('/api/target/:detailNumber/:id', async (req: any, res: any) => {
    console.log('back target search', req.params);

    const {detailNumber, id} = req.params;
    const response = { autodoc: {}, exist: [] };

    response.autodoc = await autodocApi.targetSearch(detailNumber, id);
    res.send(JSON.stringify(response));
});

app.listen(3000);