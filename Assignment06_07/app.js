const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/productdb', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Import and use routes
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const authenticateToken = require('./middleware/auth');

app.use('/api/products', authenticateToken, productRoutes);
app.use('/api/auth', authRoutes);

// Define a simple route
app.get('/', (req, res) => {
  res.send('Welcome to the Product API');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
