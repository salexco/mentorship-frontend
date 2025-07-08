import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout'; // adjust path if needed

function MentorDashboard() {
  const [requests, setRequests] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchDashboard = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setMessage('No token found. Please login again.');
        return;
      }

      try {
        // Fetch mentor requests
        const reqRes = await axios.get('http://localhost:5000/requests/mentor-requests', {
          headers: { Authorization: 'Bearer ' + token }
        });
        setRequests(reqRes.data);

        // Fetch mentor sessions
        const sesRes = await axios.get('http://localhost:5000/sessions/mentor', {
          headers: { Authorization: 'Bearer ' + token }
        });
        setSessions(sesRes.data);

      } catch (err) {
        console.error('Error fetching mentor dashboard:', err.response ? err.response.data : err.message);
        setMessage('Failed to load dashboard data.');
      }
    };

    fetchDashboard();
  }, []); // <-- ensure useEffect is closed here

  return (
    <Layout>
      <div style={{ maxWidth: '800px', margin: '20px auto' }}>
        <h2>Mentor Dashboard</h2>
        {message && <p style={{ color: 'red' }}>{message}</p>}

        <h3>Pending Requests</h3>
        {requests.length === 0 ? (
          <p>No requests found.</p>
        ) : (
          requests.map(req => (
            <div key={req._id} style={cardStyle}>
              <p><strong>Mentee:</strong> {req.mentee ? (req.mentee.name || req.mentee.email) : 'Unknown'}</p>
              <p><strong>Status:</strong> {req.status}</p>
              <p><strong>Message:</strong> {req.message}</p>
            </div>
          ))
        )}

        <h3>Upcoming Sessions</h3>
        {sessions.length === 0 ? (
          <p>No upcoming sessions.</p>
        ) : (
          sessions.map(session => (
            <div key={session._id} style={cardStyle}>
              <p><strong>Mentee:</strong> {session.mentee ? (session.mentee.name || session.mentee.email) : 'Unknown'}</p>
              <p><strong>Date:</strong> {session.date ? new Date(session.date).toLocaleString() : (session.day + ' ' + session.slot)}</p>
              <p><strong>Status:</strong> {session.status}</p>
            </div>
          ))
        )}
      </div>
    </Layout>
  );
}

const cardStyle = {
  border: '1px solid #ccc',
  borderRadius: '5px',
  margin: '10px 0',
  padding: '10px',
  background: '#fff'
};

export default MentorDashboard;
