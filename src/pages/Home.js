import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div style={styles.container}>
      <h1>Welcome to Mentorship Matching Platform</h1>
      <p>Connect with mentors and grow your skills efficiently.</p>
      <button onClick={handleLogin} style={styles.button}>
        Login
      </button>
    </div>
  );
}

const styles = {
  container: {
    textAlign: 'center',
    padding: '50px',
    background: '#f5f6fa',
    minHeight: '100vh'
  },
  button: {
    padding: '10px 20px',
    background: '#2c3e50',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1em'
  }
};

export default Home;
