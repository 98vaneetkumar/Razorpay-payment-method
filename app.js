// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
const express = require('express');
const app = express();
app.use(express.static('public'));

const Razorpay = require('razorpay');
const razorpay = new Razorpay({
  key_id: 'YOUR_RAZORPAY_KEY_ID',
  key_secret: 'YOUR_RAZORPAY_KEY_SECRET',
});

app.get('/', async (req, res) => {
    try {
      const paymentData = {
        amount: 1000, // Amount in the smallest currency unit (e.g., paise for INR)
        currency: 'INR',
        receipt: 'payment_receipt', // Replace with your own receipt ID or generate dynamically
      };
  
      const order = await razorpay.orders.create(paymentData);
      const orderId = order.id; // Retrieve the order ID
  
      res.redirect(303, `https://checkout.razorpay.com/v1/payment-page/${orderId}`); // Redirect to the payment page with the order ID as a query parameter
    } catch (error) {
      console.error('Error creating order:', error);
      res.status(500).send('An error occurred during checkout.');
    }
  });

  app.get('/payment-success', async (req, res) => {
    try {
      const orderId = req.query.id; // Retrieve the order ID from the query parameter
  
      const order = await razorpay.orders.fetch(orderId);
      const paymentId = order.payments[0].entity_id; // Retrieve the payment ID
  
      // Use the payment ID to fetch the payment details or perform any further processing
  
      res.send('Payment successful!'); // Render a success message on the success page
    } catch (error) {
      console.error('Error retrieving payment details:', error);
      res.status(500).send('An error occurred while retrieving payment details.');
    }
  });
  

app.listen(3000, () => console.log('Running on port 3000'));