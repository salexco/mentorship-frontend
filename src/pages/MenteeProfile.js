import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_BASE_URL from "../config/api";

function MenteeProfile() {
  const [profile, setProfile] = useState({
    name: '',
    bio: '',
    skills: '',
    goals: ''
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${API_BASE_URL}/users/me`, {
          headers: { Authorization: 'Bearer ' + token }
        });
        setProfile({
          name: res.data.name || '',
          bio: res.data.bio || '',
          skills: res.data.skills ? res.data.skills.join(', ') : '',
          goals: res.data.goals || ''
        });
      } catch (err) {
        console.error(err);
        setMessage('Failed to load profile');
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log('Token used:', token);
      const res = await axios.put(`${API_BASE_URL}/users/me`, {
        ...profile,
        skills: profile.skills.split(',').map(s => s.trim())
      }, {
        headers: { Authorization: 'Bearer ' + token }
      });
      setMessage('Profile updated');
      setProfile({
        name: res.data.name || '',
        bio: res.data.bio || '',
        skills: res.data.skills ? res.data.skills.join(', ') : '',
        goals: res.data.goals || ''
      });
    } catch (err) {
      console.error(err);
      setMessage('Failed to update profile');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '20px auto' }}>
      <h2>My Profile</h2>
      {message && <p>{message}</p>}

      <label>Name</label>
      <input type="text" name="name" value={profile.name} onChange={handleChange} />

      <label>Bio</label>
      <textarea name="bio" value={profile.bio} onChange={handleChange}></textarea>

      <label>Skills (comma separated)</label>
      <input type="text" name="skills" value={profile.skills} onChange={handleChange} />

      <label>Goals</label>
      <textarea name="goals" value={profile.goals} onChange={handleChange}></textarea>

      <button onClick={handleSave}>Save</button>
    </div>
  );
}

export default MenteeProfile;