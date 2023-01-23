const express = require("express");
const mongoose = require('mongoose');
const productModel = require('../models/productsModel');
mongoose.set('strictQuery', true);
const keys = require("../keys");
const { response } = require("express");
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: keys.cloud_name,
    api_key: keys.api_key,
    api_secret: keys.secret_key,
    secure: true
});

const product = express.Router();

//get request:
product.get("/product", async(request, response) => {
        const data = await productModel.find({});
        try {
            response.status(200).send(data);
        } catch (err) {
            response.status(500).send(err.message);
        }
    })
    //post request:
product.post("/product", async(request, response) => {
    let file = request.files.file;
    let image_url = await cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
        if (err) {
            console.log("printing error", err.message)
        } else { console.log(result); }

    });
    const post = await productModel({
        product_name: request.body.product_name,
        product_price: request.body.product_price,
        product_image: image_url.url
    });
    try {
        let savedData = await post.save();
        response.status(201).send(savedData);
    } catch (err) {
        response.status(500).send(err.message);
    }
})

//connection:
mongoose.connect("mongodb+srv://Aashu:ThziegmY8AU2sMty@cluster0.ffscr9x.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true }).then(() => { console.log(`mongoose connection established`); }).catch((err) => {
    console.log(`mongoose conneciton error ${err.message}`);
})

module.exports = product;