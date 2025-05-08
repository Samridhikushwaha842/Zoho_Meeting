const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const { sequelize } = require('./utils/db');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

// Database connection
sequelize.sync().then(() => {
  console.log('MS SQL connected');
}).catch(err => {
  console.error('MS SQL connection error:', err);
  process.exit(1);
});

// Start server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

// Handle port in use error
server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Please stop other instances or use a different port.`);
    process.exit(1);
  } else {
    console.error('Server error:', err);
  }
});