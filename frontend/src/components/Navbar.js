import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Navbar.css';


function Navbar({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await axios.post('http://localhost:5000/api/logout', {}, { withCredentials: true });
    setUser(null);
    navigate('/');
  };

  return (
    <nav style={{ padding: '10px' }}>
      <h3>InfluencerConnect</h3>
      <p style={{ marginTop: '-10px', fontSize: '0.9rem' }}>
        Where brands and influencers meet.
      </p>

      <div className="nav-links">
  {!user ? (
    <>
      <Link to="/">Login</Link>
      <Link to="/signup">Signup</Link>
    </>
  ) : (
    <>
      {user.role === 'influencer' && (
        <Link to="/influencer/dashboard">Dashboard</Link>
      )}
      {user.role === 'company' && (
        <Link to="/company/dashboard">Dashboard</Link>
      )}
      <button onClick={handleLogout}>Logout</button>
    </>
  )}
</div>

    </nav>
  );
}

export default Navbar;
