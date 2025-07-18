import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import API_BASE_URL from '../config/api';
import Sidebar from './Sidebar'; // ✅ Import Sidebar

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
        console.log("🔍 Using API_BASE_URL:", API_BASE_URL);

        const res = await axios.get(`${API_BASE_URL}/auth/me`, {
          headers: { Authorization: 'Bearer ' + token }
        });

        console.log("✅ Layout fetched user:", res.data);
        setUser(res.data.user);
      } catch (err) {
        console.error('❌ Layout fetch error:', err.response ? err.response.data : err.message);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  if (loading) return <p>Loading layout...</p>;

  if (!user) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <p>User not found or session expired. Please <Link to="/login">login again</Link>.</p>
      </div>
    );
  }

  return (
    <div className="layout" style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar /> {/* ✅ Sidebar with logout INSIDE */}
      <main style={{ flex: 1, padding: '30px', background: '#ecf0f1' }}>
        {children}
      </main>
    </div>
  );
}

export default Layout;

