const stripe = require("stripe")(process.env.STRIPE_SECRET);
const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Subscription = require("../../models/Subscription");

router.post("/checkout",auth, async (req, res) => {
  const {amt,name,tier } = req.body;
  // console.log(req);
  try {
    const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price_data:{
              currency:"inr",
              product_data:{
                name:name
              },
              unit_amount:amt*100,
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        payment_method_types:["card"],
        metadata:{id:req.userId,tier:tier},
        success_url: `http://localhost:5173/success/${amt}`,
        cancel_url: 'http://localhost:5173/failure',
      });

    res.status(200).json({session:session});
  } catch (err) {
    res.status(500).json(err);
  }
});


router.post('/webhook', async (req, res) => {
  const sig = req.headers['stripe-signature'];
  
  let event;

  try {
    event = await stripe.webhooks.constructEvent(req.rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error(err);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  if (event.type == 'checkout.session.completed') {
    const session = event.data.object;
    // console.log(session);
    
    const userId = session.metadata.id; 
    const tier=session.metadata.tier
    console.log({"id":userId});

    const currentDate = new Date();
    const expiryDate = new Date(currentDate.setMonth(currentDate.getMonth()+1));
    // console.log("expiry: ",expiryDate);
    const subscription = new Subscription({
        duration: 1,
        userId: userId,
        expiryDate: expiryDate,
        tier:tier
    });
    try{
      await subscription.save();
      console.log("Subscription successfull");
    }
    catch(err)
    {
        console.log(err);
    }
    
    
  }
  else  console.log(`Unhandled event type ${event.type}`);


  res.json({ received: true });
});


module.exports = router;
