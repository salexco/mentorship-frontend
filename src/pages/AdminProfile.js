import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_BASE_URL from "../config/api";

function AdminProfile() {
  const [profile, setProfile] = useState({ name: '', email: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get(`${API_BASE_URL}/admin/profile`, {
          headers: { Authorization: 'Bearer ' + token }
        });
        setProfile({ name: res.data.name, email: res.data.email });
      } catch (err) {
        console.error('Error fetching admin profile:', err.response ? err.response.data : err.message);
        setMessage('Failed to load profile');
      }
    };
    fetchProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const res = await axios.put(`${API_BASE_URL}/admin/profile`, profile, {
        headers: { Authorization: 'Bearer ' + token }
      });
      setMessage('Profile updated successfully');
      setProfile({ name: res.data.name, email: res.data.email });
    } catch (err) {
      console.error('Error updating profile:', err.response ? err.response.data : err.message);
      setMessage('Failed to update profile');
    }
  };

  return (
    <div>
      <h2>Admin Profile</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            value={profile.name}
            onChange={e => setProfile({ ...profile, name: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={profile.email}
            onChange={e => setProfile({ ...profile, email: e.target.value })}
            required
          />
        </div>

        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
}

export default AdminProfile;
