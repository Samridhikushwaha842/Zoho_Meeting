const db = require('../models/db'); // adjust path to your db connection file

// Helper: Check if email is valid
function isValidEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;

  // Basic validation
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'All fields are required.' });
  }
  if (!isValidEmail(email)) {
    return res.status(400).json({ error: 'Email is not valid.' });
  }
  if (password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters.' });
  }

  try {
    // Check if user already exists
    const [existing] = await db.query('SELECT * FROM Users WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Create user (password should be hashed in production!)
    await db.query(
      'INSERT INTO Users (name, email, password) VALUES (?, ?, ?)',
      [name, email, password]
    );

    res.status(201).json({ message: 'Signup successful!' });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};
