import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_BASE_URL from "../config/api";
import { useNavigate } from 'react-router-dom';

function MentorFeedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const user = JSON.parse(localStorage.getItem('user'));
        console.log('User:', user);

        // 🔒 Check if user is mentor
        if (user.role !== 'mentor') {
          setMessage('Access denied: Mentors only');
          return;
        }

        const res = await axios.get(`${API_BASE_URL}/feedback/mentor`, {
          headers: { Authorization: 'Bearer ' + token }
        });

        console.log('Fetched mentor feedback:', res.data);
        setFeedbacks(res.data);
      } catch (err) {
        console.error('Error fetching mentor feedback:', err.response ? err.response.data : err.message);
        setMessage('Failed to load feedback');
      }
    };

    fetchFeedback();
  }, [navigate]);

  return (
    <div style={{ maxWidth: '800px', margin: '20px auto' }}>
      <h2>My Feedback Summary</h2>
      {message && <p>{message}</p>}
      {message === 'Access denied: Mentors only' ? null : (
        feedbacks.length === 0 ? (
          <p>No feedback yet.</p>
        ) : (
          feedbacks.map(fb => (
            <div key={fb._id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
              <p><strong>Mentee:</strong> {fb.session.mentee.name || fb.session.mentee.email}</p>
              <p><strong>Rating:</strong> {fb.rating}</p>
              <p><strong>Comment:</strong> {fb.comment}</p>
            </div>
          ))
        )
      )}
    </div>
  );
}

export default MentorFeedback;