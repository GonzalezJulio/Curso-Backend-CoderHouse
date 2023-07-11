// Create a new Express application.
const express = require('express');
const app = express();

// Install the `body-parser` middleware.
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// Create a new route for the shopping cart.
app.post('/cart', (req, res) => {

  // Use the `body-parser` middleware to parse the request body.
  const cart = req.body;

  // Create a new `Cart` object.
  const cart = new Cart();

  // Add the items from the request body to the cart.
  for (const item of cart.items) {
    cart.addItem(item);
  }

  // Return the cart to the client.
  res.json(cart);

});

// Start the Express server.
app.listen(3000, () => console.log('Server started on port 3000'));