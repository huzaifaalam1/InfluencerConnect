import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('influencer');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:5000/api/login', // Adjust port/backend route if needed
        { email, password, role },
        { withCredentials: true }
      );
      const userRole = response.data.role;

      if (userRole === 'influencer') {
        navigate('/influencer/dashboard');
      } else if (userRole === 'company') {
        navigate('/company/dashboard');
      }
    } catch (err) {
      setError('Invalid credentials or role mismatch');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" value={email}
          onChange={(e) => setEmail(e.target.value)} required /><br />
        <input type="password" placeholder="Password" value={password}
          onChange={(e) => setPassword(e.target.value)} required /><br />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="influencer">Influencer</option>
          <option value="company">Company</option>
        </select><br />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}

export default LoginPage;
