import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdminFeedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchFeedback = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get('http://localhost:5000/admin/feedback', {
          headers: { Authorization: 'Bearer ' + token }
        });
        setFeedbacks(res.data);
      } catch (err) {
        console.error('Error fetching feedback:', err.response ? err.response.data : err.message);
        setMessage('Failed to load feedback');
      }
    };
    fetchFeedback();
  }, []);

  return (
    <div>
      <h2>All Feedback</h2>
      {message && <p>{message}</p>}
      {feedbacks.length === 0 ? (
        <p>No feedback found</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Mentee</th>
              <th>Mentor</th>
              <th>Rating</th>
              <th>Comment</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.map(feedback => (
              <tr key={feedback._id}>
                <td>{feedback.mentee ? feedback.mentee.name : 'N/A'}</td>
                <td>{feedback.mentor ? feedback.mentor.name : 'N/A'}</td>
                <td>{feedback.rating}</td>
                <td>{feedback.comment}</td>
                <td>{new Date(feedback.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminFeedback;
