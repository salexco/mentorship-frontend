import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import API_BASE_URL from '../config/api';

function Layout({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const res = await axios.get(`${API_BASE_URL}/auth/me`, {
          headers: { Authorization: 'Bearer ' + token }
        });

        setUser(res.data);
      } catch (err) {
        console.error('Error fetching user:', err.response ? err.response.data : err.message);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (loading) return <p>Loading user...</p>;

  if (!user) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <p>User not found or session expired. Please <Link to="/login">login again</Link>.</p>
      </div>
    );
  }

  return (
    <div className="layout" style={{ display: 'flex', minHeight: '100vh' }}>
      <aside style={{ width: '220px', background: '#2c3e50', color: '#fff', padding: '20px 10px' }}>
        <h3>{user.name}</h3>
        <p><strong>Role:</strong> {user.role}</p>

        <nav>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {user.role === 'mentor' && (
              <>
                <li><Link to="/mentor/dashboard" style={styles.link}>Dashboard</Link></li>
                <li><Link to="/mentor/edit-profile" style={styles.link}>Edit Profile</Link></li>
                <li><Link to="/mentor/availability" style={styles.link}>Availability</Link></li>
                <li><Link to="/mentor/requests" style={styles.link}>Requests</Link></li>
                <li><Link to="/mentor/sessions" style={styles.link}>Sessions</Link></li>
              </>
            )}

            {user.role === 'mentee' && (
              <>
                <li><Link to="/mentee/dashboard" style={styles.link}>Dashboard</Link></li>
                <li><Link to="/mentee/mentors" style={styles.link}>Find Mentors</Link></li>
                <li><Link to="/mentee/requests" style={styles.link}>Requests</Link></li>
                <li><Link to="/mentee/sessions" style={styles.link}>Sessions</Link></li>
                <li><Link to="/mentee/profile" style={styles.link}>Profile</Link></li>
              </>
            )}
          </ul>
        </nav>

        <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
      </aside>

      <main style={{ flex: 1, padding: '30px', background: '#ecf0f1' }}>
        {children}
      </main>
    </div>
  );
}

const styles = {
  link: {
    display: 'block',
    padding: '10px 15px',
    color: '#ecf0f1',
    textDecoration: 'none',
    borderRadius: '4px',
    marginBottom: '5px',
  },
  logoutBtn: {
    marginTop: '20px',
    padding: '10px 15px',
    background: '#e74c3c',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default Layout;
