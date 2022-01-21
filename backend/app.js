const express = require('express');
const bodyParser = require('body-parser');
const products = require('./api/routes/products');

const app = express();

app.use(bodyParser.json());


app.use('/api/v1/products', products);

app.listen(()=>{
    console.log("App is running");
})