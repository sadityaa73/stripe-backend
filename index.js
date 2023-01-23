const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const port = 4000;
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(fileUpload({
    useTempFiles: true,
}));

const product = require("./api/products");

app.use("/api/products", product);

const stripePayment = require("./api/stripePayment");

app.use("/api/stripePayment", stripePayment);
app.listen(port, (err) => {
    if (!err) {
        console.log(`express connection successfull at port ${port}!!`);
    } else {
        console.log(`express connection error at port ${port}!!`);
    }
})