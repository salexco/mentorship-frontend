import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from "../config/api";
import { useParams } from 'react-router-dom';

function MenteeViewAvailability() {
  const { id } = useParams();
  const [mentor, setMentor] = useState({});
  const [slots, setSlots] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchMentor = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/${id}`);
        setMentor(res.data);
        // Assume res.data.availability is array of slots
        setSlots(res.data.availability || []);
      } catch (err) {
        console.error('Error fetching mentor:', err.response ? err.response.data : err.message);
      }
    };

    fetchMentor();
  }, [id]);

  const handleBook = async (slot) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login to book a session.');
      return;
    }

    try {
      const res = await axios.post(`${API_BASE_URL}/sessions/book`, {
        mentorId: id,
        time: slot
      }, {
        headers: { Authorization: 'Bearer ' + token }
      });

      setMessage(`Session booked successfully for ${slot}`);
      console.log(res.data);
    } catch (err) {
      console.error('Error booking session:', err.response ? err.response.data : err.message);
      setMessage('Failed to book session');
    }
  };

  return (
    <div className="container">
      <h2>Book a Session with {mentor.name}</h2>
      {message && <p>{message}</p>}

      <ul>
        {slots.map((slot, index) => (
          <li key={index}>
            {slot}
            <button onClick={() => handleBook(slot)}>Book Session</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MenteeViewAvailability;
