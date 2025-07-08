import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function MenteeViewMentors() {
  const [mentors, setMentors] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchMentors = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setMessage('Please login first.');
        return;
      }

      try {
        const res = await axios.get('http://localhost:5000/mentors', {
          headers: { Authorization: 'Bearer ' + token }
        });
        setMentors(res.data);
      } catch (err) {
        console.error('Error fetching mentors:', err.response ? err.response.data : err.message);
        setMessage('Failed to load mentors');
      }
    };

    fetchMentors();
  }, []);

  return (
    <div className="mentee-view-mentors">
      <h2>Available Mentors</h2>
      {message && <p>{message}</p>}
      <div className="mentors-list">
        {mentors.map(mentor => (
          <div key={mentor._id} className="mentor-card">
            <h3>{mentor.name}</h3>
            <p><strong>Bio:</strong> {mentor.bio}</p>
            <p><strong>Skills:</strong> {mentor.skills.join(', ')}</p>
            <p><strong>Goals:</strong> {mentor.goals}</p>
<Link to={`/mentee/mentors/${mentor._id}/availability`}>
  <button>Book Session</button>
</Link>
            <p><strong>Availability:</strong> {mentor.availability && mentor.availability.length > 0 
              ? mentor.availability.join(', ') 
              : 'No availability set'}</p>
            <button>Request Session</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MenteeViewMentors;
