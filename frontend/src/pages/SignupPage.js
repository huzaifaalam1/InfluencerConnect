import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('influencer');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://localhost:5000/api/signup',
        { email, password, role },
        { withCredentials: true }
      );

      setMessage('Account created successfully!');
      setError('');
      setTimeout(() => navigate('/'), 1500); // Redirect to login
    } catch (err) {
      setError('Signup failed. User may already exist.');
      setMessage('');
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSignup}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br />

        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="influencer">Influencer</option>
          <option value="company">Company</option>
        </select><br />

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignupPage;
