import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MentorAvailability() {
  const [availabilities, setAvailabilities] = useState([]);
  const [day, setDay] = useState('');
  const [slots, setSlots] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/availability', {
          headers: { Authorization: 'Bearer ' + token }
        });
        setAvailabilities(res.data);
      } catch (err) {
        console.error('Error fetching availability:', err.response ? err.response.data : err.message);
        setMessage('Failed to load availability');
      }
    };

    fetchAvailability();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('http://localhost:5000/availability', {
        day,
        slots: slots.split(',').map(s => s.trim())
      }, {
        headers: { Authorization: 'Bearer ' + token }
      });
      setMessage(res.data.message);
      setAvailabilities([...availabilities.filter(a => a.day !== day), res.data.availability]);
      setDay('');
      setSlots('');
    } catch (err) {
      console.error('Error setting availability:', err.response ? err.response.data : err.message);
      setMessage('Failed to set availability');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '20px auto' }}>
      <h2>Set Your Availability</h2>
      {message && <p>{message}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Day:</label><br/>
          <input value={day} onChange={e => setDay(e.target.value)} required />
        </div>
        <div>
          <label>Slots (comma separated):</label><br/>
          <input value={slots} onChange={e => setSlots(e.target.value)} required />
        </div>
        <button type="submit">Save Availability</button>
      </form>

      <h3>Your Current Availability</h3>
      {availabilities.length === 0 ? (
        <p>No availability set.</p>
      ) : (
        availabilities.map(a => (
          <div key={a._id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
            <p><strong>{a.day}</strong>: {a.slots.join(', ')}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default MentorAvailability;