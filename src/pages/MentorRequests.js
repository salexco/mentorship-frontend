import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_BASE_URL from "../config/api";

function MentorRequests() {
  const [requests, setRequests] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log("Token:", token);

        const res = await axios.get(`${API_BASE_URL}/requests/mentor-requests`, {
          headers: { Authorization: 'Bearer ' + token }
        });

        console.log("Fetched requests:", res.data);
        setRequests(res.data);
      } catch (err) {
        console.error('Error fetching requests:', err.response ? err.response.data : err.message);
        setMessage('Failed to load requests');
      }
    };

    fetchRequests();
  }, []);

  const updateRequest = async (id, action) => {
    try {
      const token = localStorage.getItem('token');

      const res = await axios.put(
        `${API_BASE_URL}/requests/` + id + '/' + action,
        {},
        { headers: { Authorization: 'Bearer ' + token } }
      );

      alert("Request " + action + "ed successfully!");
      console.log(res.data);

      // Refresh requests by removing the updated one
      setRequests(requests.filter(req => req._id !== id));
    } catch (err) {
      console.error("Error updating request:", err.response ? err.response.data : err.message);
      alert("Failed to " + action + " request");
    }
  };

  return (
    <div>
      <h2>Mentorship Requests</h2>
      {message && <p>{message}</p>}
      {requests.length === 0 ? (
        <p>No requests found.</p>
      ) : (
        requests.map(req => (
          <div key={req._id}>
            <p><strong>Mentee:</strong> {req.mentee.name || req.mentee.email}</p>
            <p><strong>Message:</strong> {req.message}</p>
            <p><strong>Status:</strong> {req.status}</p>
            {req.status === 'pending' && (
              <>
                <button onClick={() => updateRequest(req._id, 'accept')}>Accept</button>
                <button onClick={() => updateRequest(req._id, 'reject')}>Reject</button>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default MentorRequests;