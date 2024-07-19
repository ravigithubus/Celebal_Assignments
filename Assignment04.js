const express = require('express');
const app = express();
const port = 3000;

// Middleware to log requests
app.use((req, res, next) => {
  console.log(`${req.method} request for '${req.url}'`);
  next();
});

// Route for the home page
app.get('/', (req, res) => {
  res.send('Welcome to the home page!');
});

// Route for the about page
app.get('/about', (req, res) => {
  res.send('Welcome to the about page!');
});

// Middleware to handle 404 errors
app.use((req, res, next) => {
  res.status(404).send('Sorry, that page does not exist!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
