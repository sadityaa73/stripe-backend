const dotenv = require('dotenv');
const express = require('express');
const stripe = require('stripe')(process.env.SECRET_KEY);
const YOUR_DOMAIN = "http://localhost:4000";
const stripePayment = express.Router();

//post request:
stripePayment.post("/create-payment-intent", async(request, response) => {
    console.log("request.body", request.body);
    const { amount } = request.body;
    const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: 'inr',
        payment_method_types: ['card'],
    });
    try {
        response.status(200).send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        response.status(500).send(error.message);
    }
})

module.exports = stripePayment;