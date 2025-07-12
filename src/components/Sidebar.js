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
        const res = await axios.get(`${API_BASE_URL}/users/me`, {
          headers: { Authorization: 'Bearer ' + token }
        });
        setUser(res.data);
      } catch (err) {
        console.error('Error fetching user:', err.response ? err.response.data : err.message);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="sidebar">
      {user && (
        <div className="profile">
          <p><strong>{user.name}</strong></p>
          <p>{user.email}</p>
        </div>
      )}

      <ul>
        <li><Link to="/mentor/dashboard">Dashboard</Link></li>
        <li><Link to="/mentor/requests">Requests</Link></li>
        <li><Link to="/mentor/availability">Availability</Link></li>
        <li><Link to="/mentor/sessions">View Sessions</Link></li> {/* New */}
        <li><Link to="/mentor/edit-profile">Edit Profile</Link></li>
      </ul>
    </div>
  );
}

export default Sidebar;

