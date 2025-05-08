const express = require('express');
const app = express();
const authRoutes = require('./routes/auth');

app.use(express.json());
app.use('/api', authRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));
