import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_BASE_URL from "../config/api";

function AdminMatches() {
  const [matches, setMatches] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchMatches = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get(`${API_BASE_URL}/admin/matches`, {
          headers: { Authorization: 'Bearer ' + token }
        });
        setMatches(res.data);
      } catch (err) {
        console.error('Error fetching matches:', err.response ? err.response.data : err.message);
        setMessage('Failed to load matches');
      }
    };
    fetchMatches();
  }, []);

  return (
    <div>
      <h2>All Mentor-Mentee Matches</h2>
      {message && <p>{message}</p>}
      <div>
        {matches.length === 0 ? (
          <p>No matches found</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Mentor</th>
                <th>Mentee</th>
                <th>Topic</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {matches.map(match => (
                <tr key={match._id}>
                  <td>{match.mentor?.name} ({match.mentor?.email})</td>
                  <td>{match.mentee?.name} ({match.mentee?.email})</td>
                  <td>{match.topic}</td>
                  <td>{new Date(match.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default AdminMatches;
