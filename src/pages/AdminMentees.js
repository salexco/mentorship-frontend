import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdminMentees() {
  const [mentees, setMentees] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchMentees = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get('http://localhost:5000/admin/mentees', {
          headers: { Authorization: 'Bearer ' + token }
        });
        setMentees(res.data);
      } catch (err) {
        console.error('Error fetching mentees:', err.response ? err.response.data : err.message);
        setMessage('Failed to load mentees');
      }
    };
    fetchMentees();
  }, []);

  return (
    <div>
      <h2>All Mentees</h2>
      {message && <p>{message}</p>}
      <div>
        {mentees.length === 0 ? (
          <p>No mentees found</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Goals</th>
                <th>Registered At</th>
              </tr>
            </thead>
            <tbody>
              {mentees.map(mentee => (
                <tr key={mentee._id}>
                  <td>{mentee.name}</td>
                  <td>{mentee.email}</td>
                  <td>{mentee.goals}</td>
                  <td>{new Date(mentee.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default AdminMentees;
