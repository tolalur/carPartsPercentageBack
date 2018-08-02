const express = require('express');
let app = express();
const req = require('./request').req;

app.use('/api/:detailNumber', (req, res) => {
    // const a = req();
    res.send("detailNumber: " + req.params["detailNumber"])
});

app.listen(3000);