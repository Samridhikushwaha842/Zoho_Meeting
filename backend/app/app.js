module.exports = (req, res, next) => {
  const { name, email, password } = req.body;
  const errors = {};

  if (!name) errors.name = 'Name is required.';
  if (!/\S+@\S+\.\S+/.test(email)) errors.email = 'Email is not valid.';
  if (!password || password.length < 6) errors.password = 'Password must be at least 6 characters.';

  if (Object.keys(errors).length > 0) {
    return res.status(400).json(errors);
  }
  next();
};
