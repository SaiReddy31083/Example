import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authenticateUser } from '../services/authService';

const ContentCreatorLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError('Please enter both email and password.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const result = authenticateUser(username.trim(), password.trim());
      
      if (result.success) {
        // Check if user role matches the login type
        if (result.user.role === 'content-creator') {
          navigate(result.user.dashboard);
        } else {
          setError('Invalid credentials for Content Creator login. Please check your role.');
        }
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="vh-100 gradient-custom" style={{ minHeight: '100vh', background: 'linear-gradient(to right, #8B4513, #DAA520)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <fieldset style={{
        maxWidth: '400px',
        width: '100%',
        margin: '0 auto',
        borderRadius: '1rem',
        border: '2px solid #fff',
        background: 'rgba(40, 20, 10, 0.95)',
        color: '#fff',
        boxShadow: '0 0 32px 0 #0008',
        padding: '2.5rem 2rem',
        textAlign: 'center',
      }}>
        <legend style={{ fontSize: '2rem', fontWeight: 'bold', color: '#fff', letterSpacing: '2px', marginBottom: '1.5rem' }}>Content Creator Login</legend>
        <form onSubmit={handleSubmit}>
          <p style={{ color: '#fff', fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '2rem' }}>Create and share amazing heritage content!</p>
          <div style={{ background: 'rgba(255,255,255,0.1)', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
            <p style={{ color: '#DAA520', fontWeight: 'bold', marginBottom: '0.5rem' }}>Test Credentials:</p>
            <p style={{ color: '#fff', margin: '0.2rem 0' }}> creator@heritage.com</p>
            <p style={{ color: '#fff', margin: '0.2rem 0' }}> creator123</p>
          </div>
          <input
            type="email"
            id="typeEmailX"
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="Email"
            autoComplete="username"
            style={{
              width: '100%',
              padding: '0.8rem',
              marginBottom: '1.2rem',
              borderRadius: '0.5rem',
              border: '1px solid #fff',
              background: '#222',
              color: '#fff',
              fontSize: '1rem',
              fontWeight: 'bold',
              outline: 'none',
            }}
          />
          <input
            type="password"
            id="typePasswordX"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            autoComplete="current-password"
            style={{
              width: '100%',
              padding: '0.8rem',
              marginBottom: '1.2rem',
              borderRadius: '0.5rem',
              border: '1px solid #fff',
              background: '#222',
              color: '#fff',
              fontSize: '1rem',
              fontWeight: 'bold',
              outline: 'none',
            }}
          />
          <p style={{ marginBottom: '2rem', fontSize: '0.95rem' }}>
            <a href="#" style={{ color: '#DAA520', textDecoration: 'underline', fontWeight: 'bold' }}>Forgot password?</a>
          </p>
          <button type="submit" disabled={loading} style={{
            width: '100%',
            padding: '0.9rem',
            borderRadius: '2rem',
            border: 'none',
            background: loading ? '#666' : 'linear-gradient(90deg, #8B4513 0%, #DAA520 100%)',
            color: '#fff',
            fontWeight: 'bold',
            fontSize: '1.1rem',
            boxShadow: '0 2px 8px #0006',
            cursor: loading ? 'not-allowed' : 'pointer',
            marginBottom: '1.5rem',
            letterSpacing: '1px',
          }}>{loading ? 'Logging in...' : 'Login'}</button>
          {error && (
            <div style={{ color: '#ff6b6b', marginTop: '1rem', fontWeight: 'bold', fontSize: '1rem' }}>{error}</div>
          )}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', margin: '2rem 0 1rem 0' }}>
            <a href="#" style={{ color: '#fff', fontSize: '1.5rem', textShadow: '0 0 8px #DAA520' }}><i className="fab fa-facebook-f"></i></a>
            <a href="#" style={{ color: '#fff', fontSize: '1.5rem', textShadow: '0 0 8px #DAA520' }}><i className="fab fa-twitter"></i></a>
            <a href="#" style={{ color: '#fff', fontSize: '1.5rem', textShadow: '0 0 8px #DAA520' }}><i className="fab fa-google"></i></a>
          </div>
          <p style={{ marginTop: '1.5rem', fontSize: '1rem' }}>
            Don't have an account?{' '}
            <a href="#" style={{ color: '#DAA520', fontWeight: 'bold', textDecoration: 'underline' }} onClick={() => navigate('/admin/content-creator-signup')}>Sign Up</a>
          </p>
        </form>
      </fieldset>
    </section>
  );
};

export default ContentCreatorLogin;