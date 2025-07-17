import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_BASE_URL from "../config/api";

function MenteeDashboard() {
  const [profile, setProfile] = useState({});
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please login first');
        return;
      }

      try {
        const [profileRes, sessionsRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/mentees/me`, {
            headers: { Authorization: 'Bearer ' + token }
          }),
          axios.get(`${API_BASE_URL}/mentees/sessions`, {
            headers: { Authorization: 'Bearer ' + token }
          })
        ]);

        setProfile(profileRes.data);
        setSessions(sessionsRes.data);
        setLoading(false);
      } catch (err) {
        console.error('Error loading dashboard:', err.response ? err.response.data : err.message);
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) return <p>Loading dashboard...</p>;

  return (
    <div className="mentee-dashboard">
      <h2>Welcome, {profile.name}</h2>

      <section className="profile-summary">
        <h3>Your Profile</h3>
        <p><strong>Email:</strong> {profile.email}</p>
        <p><strong>Goals:</strong> {profile.goals || 'N/A'}</p>
      </section>

      <section className="booked-sessions">
        <h3>Your Booked Sessions</h3>
        {sessions.length === 0 ? (
          <p>No booked sessions yet.</p>
        ) : (
          <ul>
            {sessions.map(session => (
              <li key={session._id}>
                <p><strong>Mentor:</strong> {session.mentor.name}</p>
                <p><strong>Date:</strong> {new Date(session.date).toLocaleDateString()}</p>
                <p><strong>Time:</strong> {session.time}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default MenteeDashboard;
