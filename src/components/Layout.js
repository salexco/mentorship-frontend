import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../config/api'; // import your api.js getCurrentUser function

function Layout({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // ✅ Option 1: Load from localStorage (current setup)
        const userJson = localStorage.getItem('user');
        if (userJson) {
          const parsed = JSON.parse(userJson);
          setUser(parsed);
        }

        // ✅ Option 2 (recommended): Validate token with backend
        const backendUser = await getCurrentUser(); // calls /auth/me
        setUser(backendUser);
      } catch (err) {
        console.error('Error fetching user:', err);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (loading) {
    return <div style={{ textAlign: 'center', marginTop: '50px' }}>Loading...</div>;
  }

  if (!user) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <p>User not found or session expired. Please <Link to="/login">login again</Link>.</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <aside style={styles.sidebar}>
        <div style={styles.userInfo}>
          <h3>{user.name}</h3>
          <p style={{ fontSize: '0.9em' }}>Role: {user.role}</p>
        </div>

        <nav>
          <ul style={styles.navList}>
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

      <main style={styles.main}>
        {children}
      </main>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'row',
  },
  sidebar: {
    width: '220px',
    background: '#2c3e50',
    color: '#fff',
    padding: '20px 10px',
  },
  userInfo: {
    marginBottom: '30px',
  },
  navList: {
    listStyle: 'none',
    padding: 0,
  },
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
  main: {
    flex: 1,
    padding: '30px',
    background: '#ecf0f1',
  }
};

export default Layout;
