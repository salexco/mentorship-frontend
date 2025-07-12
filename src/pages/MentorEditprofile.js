import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from "../config/api";

function MentorEditProfile() {
  const [form, setForm] = useState({ name: '', bio: '', skills: '', goals: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setMessage('No token found. Please login.');
        return;
      }

      try {
        const res = await axios.get(`${API_BASE_URL}/mentors/me`, {
          headers: { Authorization: 'Bearer ' + token }
        });
        setForm({
          name: res.data.name || '',
          bio: res.data.bio || '',
          skills: res.data.skills ? res.data.skills.join(', ') : '',
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
      setMessage('No token found. Please login.');
      return;
    }

    try {
      const res = await axios.put(`${API_BASE_URL}/mentors/profile`, {
        ...form,
        skills: form.skills.split(',').map(s => s.trim())
      }, {
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
    <div className="edit-profile-container">
      <h2>Edit Mentor Profile</h2>
      {message && <p>{message}</p>}
      <form className="edit-profile-form" onSubmit={handleSubmit}>
        <input
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          placeholder="Name"
          required
        />
        <textarea
          value={form.bio}
          onChange={e => setForm({ ...form, bio: e.target.value })}
          placeholder="Bio"
        />
        <input
          value={form.skills}
          onChange={e => setForm({ ...form, skills: e.target.value })}
          placeholder="Skills (comma separated)"
        />
        <input
          value={form.goals}
          onChange={e => setForm({ ...form, goals: e.target.value })}
          placeholder="Goals"
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default MentorEditProfile;
