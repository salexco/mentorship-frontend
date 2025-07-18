import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from "../config/api";

function Sidebar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get(`${API_BASE_URL}/auth/me`, {
          headers: { Authorization: 'Bearer ' + token }
        });

        console.log("✅ Sidebar fetched user:", res.data);
        setUser(res.data.user); // adjust for your backend response shape
      } catch (err) {
        console.error('❌ Sidebar fetch error:', err.response ? err.response.data : err.message);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (!user) {
    return <div>Loading sidebar...</div>;
  }

  return (
    <div className="sidebar" style={styles.sidebar}>
      <div style={styles.profile}>
        <p><strong>{user.name}</strong></p>
        <p>{user.email}</p>
        <p>Role: {user.role}</p>
      </div>

      <ul style={styles.navList}>
        {user.role === 'mentor' && (
          <>
            <li><Link to="/mentor/dashboard" style={styles.link}>Dashboard</Link></li>
            <li><Link to="/mentor/requests" style={styles.link}>Requests</Link></li>
            <li><Link to="/mentor/availability" style={styles.link}>Availability</Link></li>
            <li><Link to="/mentor/sessions" style={styles.link}>View Sessions</Link></li>
            <li><Link to="/mentor/edit-profile" style={styles.link}>Edit Profile</Link></li>
          </>
        )}

        {user.role === 'mentee' && (
          <>
            <li><Link to="/mentee/dashboard" style={styles.link}>Dashboard</Link></li>
            <li><Link to="/mentee/mentors" style={styles.link}>Find Mentors</Link></li>
            <li><Link to="/mentee/requests" style={styles.link}>Requests</Link></li>
            <li><Link to="/mentee/sessions" style={styles.link}>Sessions</Link></li>
            <li><Link to="/mentee/profile" style={styles.link}>Profile</Link></li>
          </>
        )}
      </ul>

      <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
    </div>
  );
}

const styles = {
  sidebar: {
    background: '#2c3e50',
    color: '#fff',
    padding: '20px',
    width: '220px',
    minHeight: '100vh',
  },
  profile: {
    marginBottom: '30px',
    lineHeight: '1.5em',
  },
  navList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  link: {
    display: 'block',
    padding: '8px 12px',
    color: '#ecf0f1',
    textDecoration: 'none',
    borderRadius: '4px',
    marginBottom: '5px',
    transition: 'background 0.2s',
  },
  logoutBtn: {
    marginTop: '20px',
    width: '100%',
    padding: '10px',
    background: '#e74c3c',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default Sidebar;


