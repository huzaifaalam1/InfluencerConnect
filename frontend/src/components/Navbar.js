import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Optional: create styles/components/Navbar.css

function Navbar() {
  return (
    <nav>
      <Link to="/">Login</Link> | 
      <Link to="/signup">Signup</Link> | 
      <Link to="/influencer/dashboard">Influencer</Link> | 
      <Link to="/company/dashboard">Company</Link>
    </nav>
  );
}

export default Navbar;
