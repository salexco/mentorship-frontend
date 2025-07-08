import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';

function MentorSessions() {
  const [sessions, setSessions] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchSessions = async () => {
      const token = localStorage.getItem('token');

      try {
        const res = await axios.get('http://localhost:5000/sessions/mentor', {
          headers: { Authorization: 'Bearer ' + token }
        });
        setSessions(res.data);
      } catch (err) {
        console.error('Error fetching sessions:', err.response ? err.response.data : err.message);
        setMessage('Failed to load sessions');
      }
    };

    fetchSessions();
  }, []);

  return (
    <Layout>
      <div>
        <h2>My Booked Sessions</h2>
        {message && <p>{message}</p>}

        {sessions.length === 0 ? (
          <p>No sessions found.</p>
        ) : (
          sessions.map(session => (
            <div key={session._id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
              <p><strong>Mentee:</strong> {session.mentee.name || session.mentee.email}</p>
              <p><strong>Date:</strong> {session.date ? new Date(session.date).toLocaleString() : 'Not set'}</p>
              <p><strong>Status:</strong> {session.status}</p>
            </div>
          ))
        )}
      </div>
    </Layout>
  );
}

export default MentorSessions;
