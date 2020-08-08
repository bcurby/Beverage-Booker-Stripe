const express = require("express");

const app = express();

const { resolve } = require("path");

// This is your real test secret API key.

const stripe = require("stripe")("sk_test_51HBYC3D60uGVgHNv1uDUE8FbPZUbjKgqGzEeh31yuTH8kM2PKM6UKyEbHrVrquNMeB4SqyfDPqBPxLpzCOQbVtVZ001oxtGVYU");

app.use(express.static("."));

app.use(express.json());

const calculateOrderAmount = items => {

  console.log(items[0].amount)

  return items[0].amount;

};

app.post("/create-payment-intent", async (req, res) => {

  const { items } = req.body;

  // Create a PaymentIntent with the order amount and currency

  const paymentIntent = await stripe.paymentIntents.create({

    amount: calculateOrderAmount(items),

    currency: "aud"

  });

  res.send({

    clientSecret: paymentIntent.client_secret

  });

});

//app.listen(4242, () => console.log('Node server listening on port 4242!'));
const PORT = process.env.PORT || 5001;
//const PORT = 5001
app.listen(PORT, () => console.log('Node server listening on port ${PORT}'));
