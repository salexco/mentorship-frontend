import React, { useState } from 'react';
import axios from 'axios';

function MentorComment({ menteeId }) {
  const [text, setText] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const res = await axios.post('http://localhost:5000/comments', {
        menteeId,
        text
      }, {
        headers: { Authorization: 'Bearer ' + token }
      });

      setMessage('Comment posted successfully');
      setText('');
      console.log(res.data);
    } catch (err) {
      console.error('Error posting comment:', err.response ? err.response.data : err.message);
      setMessage('Failed to post comment');
    }
  };

  return (
    <div>
      <h3>Leave a Comment for Mentee</h3>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Write your comment here"
          required
        />
        <button type="submit">Post Comment</button>
      </form>
    </div>
  );
}

export default MentorComment;
