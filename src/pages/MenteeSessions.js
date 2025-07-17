import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_BASE_URL from "../config/api";

function MenteeSessions() {
  const [sessions, setSessions] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('Token in localStorage:', token);

        const res = await axios.get(`${API_BASE_URL}/sessions/mentee`, {
          headers: {
            Authorization: 'Bearer ' + token
          }
        });

        console.log('Fetched mentee sessions:', res.data);

        setSessions(res.data);
      } catch (err) {
        console.error('Error fetching sessions:', err.response ? err.response.data : err.message);
        setMessage('Failed to load sessions');
      }
    };

    fetchSessions();
  }, []);

  return (
    <div style={{ maxWidth: '800px', margin: '20px auto' }}>
      <h2>My Sessions</h2>
      {message && <p>{message}</p>}
      {sessions.length === 0 ? (
        <p>No sessions found.</p>
      ) : (
        sessions.map(session => (
          <div key={session._id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
            <p><strong>Mentor:</strong> {session.mentor?.name || session.mentor?.email}</p>
            <p><strong>Date:</strong> {new Date(session.date).toLocaleString()}</p>
            <p><strong>Status:</strong> {session.status}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default MenteeSessions;