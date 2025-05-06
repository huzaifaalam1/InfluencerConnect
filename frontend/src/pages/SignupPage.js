import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './SignupPage.css'; // ✅ Import styling

function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('influencer');
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
      navigate('/');
    } catch (err) {
      setError('Signup failed. Email may already be in use.');
    }
  };

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSignup} className="signup-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="influencer">Influencer</option>
          <option value="company">Company</option>
        </select>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignupPage;
