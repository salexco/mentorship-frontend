import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_BASE_URL from "../config/api";

function MenteeRequests() {
  const [requests, setRequests] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('Token in localStorage:', token);

        const res = await axios.get(`${API_BASE_URL}/requests/my-requests`, {
          headers: {
            Authorization: 'Bearer ' + token
          }
        });

        console.log('Fetched mentee requests:', res.data);
        setRequests(res.data);
      } catch (err) {
        console.error('Error fetching requests:', err.response ? err.response.data : err.message);
        setMessage('Failed to load requests');
      }
    };

    fetchRequests();
  }, []);

  return (
    <div style={{ maxWidth: '800px', margin: '20px auto' }}>
      <h2>My Mentorship Requests</h2>
      {message && <p>{message}</p>}
      {requests.length === 0 ? (
        <p>No requests found.</p>
      ) : (
        requests.map(req => (
          <div key={req._id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
            <p><strong>Mentor:</strong> {req.mentor.name || req.mentor.email}</p>
            <p><strong>Status:</strong> {req.status}</p>
            <p><strong>Message:</strong> {req.message}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default MenteeRequests;