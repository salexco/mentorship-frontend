import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from "../config/api";

function MenteeEditProfile() {
  const [form, setForm] = useState({ name: '', bio: '', goals: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setMessage('Please login first.');
        return;
      }

      try {
        const res = await axios.get(`${API_BASE_URL}/mentees/me`, {
          headers: { Authorization: 'Bearer ' + token }
        });
        setForm({
          name: res.data.name || '',
          bio: res.data.bio || '',
          goals: res.data.goals || ''
        });
      } catch (err) {
        console.error('Error fetching profile:', err.response ? err.response.data : err.message);
        setMessage('Failed to load profile');
      }
    };

    fetchProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('Please login first.');
      return;
    }

    try {
      const res = await axios.put(`${API_BASE_URL}/mentees/profile`, form, {
        headers: { Authorization: 'Bearer ' + token }
      });
      setMessage('Profile updated successfully');
      console.log(res.data);
    } catch (err) {
      console.error('Error updating profile:', err.response ? err.response.data : err.message);
      setMessage('Failed to update profile');
    }
  };

  return (
    <div className="mentee-edit-profile">
      <h2>Edit Mentee Profile</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            placeholder="Name"
            required
          />
        </div>

        <div className="form-group">
          <label>Bio</label>
          <textarea
            value={form.bio}
            onChange={e => setForm({ ...form, bio: e.target.value })}
            placeholder="Bio"
          />
        </div>

        <div className="form-group">
          <label>Goals</label>
          <input
            value={form.goals}
            onChange={e => setForm({ ...form, goals: e.target.value })}
            placeholder="Goals"
          />
        </div>

        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
}

export default MenteeEditProfile;
