import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'flex-end',
      gap: '10px',
      padding: '20px',
      background: '#2c3e50'
    }}>
      <Link to="/login">
        <button>Login</button>
      </Link>
      <Link to="/register">
        <button>Register</button>
      </Link>
    </nav>
  );
}

export default Navbar;
