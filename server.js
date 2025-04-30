// server/server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import cors

const app = express();
const port = 5000;

// Use cors middleware to allow requests from your frontend (http://localhost:3000)
app.use(cors());  // This will allow requests from any origin (you can configure it for more control)

// Middleware
app.use(bodyParser.json());

// Sample signup endpoint
app.post('/signup', (req, res) => {
  const { username, email, password } = req.body;

  // Simple validation (you can improve this part)
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Here you would usually save the data to a database
  // For now, we'll just return a success message
  console.log('New user:', { username, email, password });
  res.status(200).json({ message: 'Signup successful!' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
