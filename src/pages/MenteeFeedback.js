import React, { useState } from 'react';
import axios from 'axios';

function MenteeFeedback() {
  const [sessionId, setSessionId] = useState('');
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState('');
  const [message, setMessage] = useState('');

  const submitFeedback = async () => {
    try {
      const token = localStorage.getItem('token');

      const res = await axios.put('http://localhost:5000/sessions/' + sessionId + '/feedback', 
        { feedback: feedback, rating: rating }, 
        { headers: { Authorization: 'Bearer ' + token } }
      );

      console.log('Feedback submitted:', res.data);
      setMessage('Feedback submitted successfully!');
      setSessionId('');
      setFeedback('');
      setRating('');
    } catch (err) {
      console.error('Error submitting feedback:', err.response ? err.response.data : err.message);
      setMessage('Failed to submit feedback');
    }
  };

  return (
    <div style={{ maxWidth: '700px', margin: '20px auto' }}>
      <h2>Submit Session Feedback</h2>
      {message && <p>{message}</p>}

      <input
        type="text"
        placeholder="Session ID"
        value={sessionId}
        onChange={e => setSessionId(e.target.value)}
      />
      <br />

      <textarea
        placeholder="Write your feedback"
        value={feedback}
        onChange={e => setFeedback(e.target.value)}
        rows="4"
        cols="50"
      />
      <br />

      <input
        type="number"
        placeholder="Rating (1-5)"
        value={rating}
        onChange={e => setRating(e.target.value)}
        min="1"
        max="5"
      />
      <br />

      <button onClick={submitFeedback}>Submit Feedback</button>
    </div>
  );
}

export default MenteeFeedback;