import React, { useState } from 'react';
import axios from 'axios';

function AdminSettings() {
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      await axios.post('http://localhost:5000/admin/settings', { key, value }, {
        headers: { Authorization: 'Bearer ' + token }
      });
      setMessage('Setting updated successfully');
    } catch (err) {
      console.error('Error updating settings:', err.response ? err.response.data : err.message);
      setMessage('Failed to update setting');
    }
  };

  return (
    <div>
      <h2>Admin Settings</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          value={key}
          onChange={e => setKey(e.target.value)}
          placeholder="Setting Key"
          required
        />
        <input
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder="Setting Value"
          required
        />
        <button type="submit">Update Setting</button>
      </form>
    </div>
  );
}

export default AdminSettings;
