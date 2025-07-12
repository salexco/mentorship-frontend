import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_BASE_URL from "../config/api";

function MenteeBooking() {
  const [mentors, setMentors] = useState([]);
  const [selectedMentor, setSelectedMentor] = useState('');
  const [availability, setAvailability] = useState([]);
  const [day, setDay] = useState('');
  const [slot, setSlot] = useState('');
  const [message, setMessage] = useState('');

  // Fetch mentors when component mounts
  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${API_BASE_URL}/mentors`, {
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

  // Fetch mentor availability
  const fetchAvailability = async (mentorId) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${API_BASE_URL}/availability/` + mentorId, {
        headers: { Authorization: 'Bearer ' + token }
      });
      setAvailability(res.data);
    } catch (err) {
      console.error('Error fetching availability:', err.response ? err.response.data : err.message);
    }
  };

  // Handle booking a session
  const handleBook = async () => {
    console.log("Book Session button clicked");
    console.log("Selected Mentor:", selectedMentor);
    console.log("Day (date):", day);
    console.log("Slot (time):", slot);

    if (!selectedMentor || !day || !slot) {
      setMessage('Please select mentor, day, and slot.');
      console.log("Booking aborted due to missing data");
      return;
    }

    try {
      const token = localStorage.getItem('token');
      console.log("Token:", token);

      const res = await axios.post(`${API_BASE_URL}/sessions`, {
        mentorId: selectedMentor,
        date: day,   // ✅ backend expects "date"
        time: slot   // ✅ backend expects "time"
      }, {
        headers: { Authorization: 'Bearer ' + token }
      });

      console.log("Booking response:", res.data);
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
        <div>
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

          {/* ✅ Book Session button with onClick */}
          <button onClick={handleBook}>Book Session</button>
        </div>
      )}
    </div>
  );
}

export default MenteeBooking;

