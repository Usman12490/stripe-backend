const express = require('express');
const cors = require('cors');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();
app.use(cors());
app.use(express.json());

app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    line_items: req.body.items,
    success_url: 'https://yourwebsite.com/success',
    cancel_url: 'https://yourwebsite.com/cancel',
  });

  res.json({ id: session.id });
});

app.listen(3000, () => console.log('Server running on port 3000'));
