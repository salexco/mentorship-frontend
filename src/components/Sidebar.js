import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from "../config/api";

function Sidebar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get(`${API_BASE_URL}/auth/me`, {
          headers: { Authorization: 'Bearer ' + token }
        });

        console.log("✅ Sidebar fetched user:", res.data);
        setUser(res.data.user); // Adjusted to match /auth/me returning { user: {..} }
      } catch (err) {
        console.error('❌ Sidebar fetch error:', err.response ? err.response.data : err.message);
      }
    };

    fetchUser();
  }, []);

  if (!user) {
    return <div>Loading sidebar...</div>;
  }

  return (
    <div className="sidebar" style={{ background: '#2c3e50', color: '#fff', padding: '20px' }}>
      <div className="profile">
        <p><strong>{user.name}</strong></p>
        <p>{user.email}</p>
        <p>Role: {user.role}</p>
      </div>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {user.role === 'mentor' && (
          <>
            <li><Link to="/mentor/dashboard">Dashboard</Link></li>
            <li><Link to="/mentor/requests">Requests</Link></li>
            <li><Link to="/mentor/availability">Availability</Link></li>
            <li><Link to="/mentor/sessions">View Sessions</Link></li>
            <li><Link to="/mentor/edit-profile">Edit Profile</Link></li>
          </>
        )}

        {user.role === 'mentee' && (
          <>
            <li><Link to="/mentee/dashboard">Dashboard</Link></li>
            <li><Link to="/mentee/mentors">Find Mentors</Link></li>
            <li><Link to="/mentee/requests">Requests</Link></li>
            <li><Link to="/mentee/sessions">Sessions</Link></li>
            <li><Link to="/mentee/profile">Profile</Link></li>
          </>
        )}
      </ul>
    </div>
  );
}

export default Sidebar;

