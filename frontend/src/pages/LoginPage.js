import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css'; // ✅ Import the new CSS file

function LoginPage({ setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('influencer');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://localhost:5000/api/login',
        { email, password, role },
        { withCredentials: true }
      );

      const res = await axios.get('http://localhost:5000/api/me', { withCredentials: true });
      setUser(res.data);

      if (res.data.role === 'influencer') {
        navigate('/influencer/dashboard');
      } else if (res.data.role === 'company') {
        navigate('/company/dashboard');
      }
    } catch (err) {
      setError('Invalid credentials or role mismatch');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleLogin} className="login-form">
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
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}

export default LoginPage;
