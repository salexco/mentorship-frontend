import React, { useEffect, useState } from 'react';
import axios from 'axios';

function MenteeBooking() {
  const [mentors, setMentors] = useState([]);
  const [selectedMentor, setSelectedMentor] = useState('');
  const [availability, setAvailability] = useState([]);
  const [day, setDay] = useState('');
  const [slot, setSlot] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchMentors = async () => {
  try {
    const token = localStorage.getItem('token');
    const res = await axios.get('http://localhost:5000/mentors', {
      headers: { Authorization: 'Bearer ' + token }
    });
    console.log('Fetched mentors:', res.data);
    setMentors(res.data);
  } catch (err) {
    console.error('Error fetching mentors:', err);
  }
};
    fetchMentors();
  }, []);

  const fetchAvailability = async (mentorId) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/availability/' + mentorId, {
        headers: { Authorization: 'Bearer ' + token }
      });
      setAvailability(res.data);
    } catch (err) {
      console.error('Error fetching availability:', err.response ? err.response.data : err.message);
    }
  };

  const handleBook = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
     await axios.post('http://localhost:5000/sessions/book', {
        mentorId: selectedMentor,
        day,
        slot
      }, {
        headers: { Authorization: 'Bearer ' + token }
      });
      setMessage('Session booked successfully!');
    } catch (err) {
      console.error('Error booking session:', err.response ? err.response.data : err.message);
      setMessage('Failed to book session.');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '20px auto' }}>
      <h2>Book a Session</h2>
      {message && <p>{message}</p>}

      <div>
        <label>Select Mentor:</label><br/>
        <select value={selectedMentor} onChange={e => {
          setSelectedMentor(e.target.value);
          fetchAvailability(e.target.value);
        }}>
          <option value="">-- Select --</option>
          {mentors.map(m => (
            <option key={m._id} value={m._id}>{m.name || m.email}</option>
          ))}
        </select>
      </div>

      {availability.length > 0 && (
        <form onSubmit={handleBook}>
          <div>
            <label>Day:</label><br/>
            <select value={day} onChange={e => setDay(e.target.value)} required>
              <option value="">-- Select --</option>
              {availability.map(a => (
                <option key={a._id} value={a.day}>{a.day}</option>
              ))}
            </select>
          </div>

          <div>
            <label>Slot:</label><br/>
            <select value={slot} onChange={e => setSlot(e.target.value)} required>
              <option value="">-- Select --</option>
              {availability.find(a => a.day === day)?.slots.map((s, idx) => (
                <option key={idx} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <button type="submit">Book Session</button>
        </form>
      )}
    </div>
  );
}

export default MenteeBooking;