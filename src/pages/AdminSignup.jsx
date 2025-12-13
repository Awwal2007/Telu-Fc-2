// src/pages/SignupPage.js
import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import './css/SignupPage.css'; // 👈 add this line

const AdminSignup = () => {
  const { signup, signingUp } = useAuth();
  const [formData, setFormData] = useState({});
  const [error, setError] = useState('');

  const handleInput = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      await signup(formData);
      alert('Signup successful!');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Create Admin Account</h2>
        {error && <p className="error">{error}</p>}

        <label htmlFor="name">Full Name</label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="John Doe"
          value={formData.name || ''}
          onChange={handleInput}
          required
        />

        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="admin@example.com"
          value={formData.email || ''}
          onChange={handleInput}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="********"
          value={formData.password || ''}
          onChange={handleInput}
          required
        />

        <button type="submit" disabled={signingUp}>
          {signingUp ? 'Signing up...' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
};

export default AdminSignup;
