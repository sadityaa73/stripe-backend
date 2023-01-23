const mongoose = require('mongoose');

const product = mongoose.Schema({
    product_name: {
        type: String,
        required: true
    },
    product_price: {
        type: Number,
        required: true
    },
    product_image: {
        type: String,
        required: true
    }
});

const productModel = new mongoose.model("product", product);

module.exports = productModel;