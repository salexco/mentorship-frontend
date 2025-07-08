import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdminSessions() {
  const [sessions, setSessions] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchSessions = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get('http://localhost:5000/admin/sessions', {
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
    <div>
      <h2>All Sessions</h2>
      {message && <p>{message}</p>}
      <div>
        {sessions.length === 0 ? (
          <p>No sessions found</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Mentor</th>
                <th>Mentee</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {sessions.map(session => (
                <tr key={session._id}>
                  <td>{session.mentor ? session.mentor.name : 'N/A'}</td>
                  <td>{session.mentee ? session.mentee.name : 'N/A'}</td>
                  <td>{new Date(session.date).toLocaleDateString()}</td>
                  <td>{session.time}</td>
                  <td>{session.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default AdminSessions;
