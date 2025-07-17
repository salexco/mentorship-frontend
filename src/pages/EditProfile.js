import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from "../config/api";

function EditProfile() {
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch current profile
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${API_BASE_URL}/mentor/me`, {
          headers: { Authorization: 'Bearer ' + token }
        });
        setName(res.data.name);
        setBio(res.data.bio);
      } catch (err) {
        console.error('Error fetching profile:', err.response?.data || err.message);
      }
    };
    fetchProfile();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await axios.put(`${API_BASE_URL}/mentor/update-profile`, {
        name,
        bio
      }, {
        headers: { Authorization: 'Bearer ' + token }
      });
      setMessage('Profile updated successfully!');
      console.log(res.data);
    } catch (err) {
      console.error('Error updating profile:', err.response?.data || err.message);
      setMessage('Failed to update profile');
    }
  };

  return (
    <div>
      <h2>Edit Profile</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleUpdate}>
        <div>
          <label>Name:</label><br/>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Bio:</label><br/>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </div>
        <button type="submit">Update and Save</button>
      </form>
    </div>
  );
}

export default EditProfile;
