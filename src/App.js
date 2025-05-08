import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/signup', form);
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.error || 'Signup failed');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "40px auto" }}>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          required
        /><br /><br />
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          required
        /><br /><br />
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          required
        /><br /><br />
        <button type="submit">Sign Up</button>
      </form>
      <div style={{ marginTop: 20, color: "red" }}>{message}</div>
    </div>
  );
}

export default App;
