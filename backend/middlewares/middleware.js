const express = require('express');
const app = express();

app.use(express.json());

app.post('/api/signup', (req, res) => {
  // Your signup logic here
  res.status(201).json({ message: 'Signup successful' });
});

app.listen(5000, () => console.log('Server running on port 5000'));
