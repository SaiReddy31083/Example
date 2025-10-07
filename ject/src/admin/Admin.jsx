import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Admin.css';

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [isRegistering, setIsRegistering] = useState(false);
  const [registerData, setRegisterData] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  // Load saved credentials from localStorage
  const getSavedCredentials = () => {
    const saved = localStorage.getItem('adminCredentials');
    return saved ? JSON.parse(saved) : null;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleRegisterInputChange = (e) => {
    const { name, value } = e.target;
    setRegisterData(prev => ({ ...prev, [name]: value }));
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!registerData.username || !registerData.password) {
      alert('Please enter both username and password.');
      return;
    }
    localStorage.setItem('adminCredentials', JSON.stringify(registerData));
    alert('Registration successful! You can now log in.');
    setIsRegistering(false);
    setCredentials({ username: '', password: '' });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const saved = getSavedCredentials();
    if (saved && credentials.username === saved.username && credentials.password === saved.password) {
      setIsLoggedIn(true);
      alert('Login successful!');
    } else {
      alert('Invalid credentials. Please try again or register.');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCredentials({ username: '', password: '' });
  };

  const navigateToManageData = () => {
    navigate('/admin/manage-data');
  };

  const handleViewReports = () => {
    navigate('/admin/view-reports');
  };

  const handleSystemSettings = () => {
    // For demo, show an alert. Replace with navigation if you add a settings page.
    alert('System Settings: This would show system settings.');
    // Example: navigate('/admin/settings');
  };

  if (!isLoggedIn) {
    return (
      <div className="admin-container">
        <div className="admin-login-form">
          <h1>Admin Login</h1>
          <p className="admin-subtitle">Indian Culture & Heritage Management</p>
          {isRegistering ? (
            <form onSubmit={handleRegister}>
              <div className="form-group">
                <label htmlFor="reg-username">Username:</label>
                <input
                  type="text"
                  id="reg-username"
                  name="username"
                  value={registerData.username}
                  onChange={handleRegisterInputChange}
                  required
                  placeholder="Choose a username"
                />
              </div>
              <div className="form-group">
                <label htmlFor="reg-password">Password:</label>
                <input
                  type="password"
                  id="reg-password"
                  name="password"
                  value={registerData.password}
                  onChange={handleRegisterInputChange}
                  required
                  placeholder="Choose a password"
                />
              </div>
              <button type="submit" className="login-btn">Register</button>
              <button type="button" className="login-btn" onClick={() => setIsRegistering(false)} style={{marginLeft:8}}>Back to Login</button>
            </form>
          ) : (
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label htmlFor="username">Username:</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={credentials.username}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your username"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={credentials.password}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your password"
                />
              </div>
              <div style={{ display: 'flex', gap: '16px', marginTop: '8px' }}>
                <button type="submit" className="login-btn">Login</button>
                <button type="button" className="login-btn" onClick={() => setIsRegistering(true)}>Register</button>
              </div>
            </form>
          )}
          <div className="demo-credentials">
            <p><strong>Note:</strong> You must register your own username and password. Credentials are saved locally.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <div className="admin-dashboard">
        <div className="dashboard-header">
          <h1>Admin Dashboard</h1>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
        
        <div className="dashboard-content">
          <h2>Welcome to the Heritage Management System</h2>
          <p>Manage cultural data, monuments, and heritage site information.</p>
          
          <div className="dashboard-stats">
            <div className="stat-card">
              <h3>Cultural Entries</h3>
              <p className="stat-number">6</p>
              <p>Festival & Tradition data</p>
            </div>
            
            <div className="stat-card">
              <h3>Monuments</h3>
              <p className="stat-number">6</p>
              <p>Famous Indian monuments</p>
            </div>
            
            <div className="stat-card">
              <h3>Heritage Sites</h3>
              <p className="stat-number">4</p>
              <p>UNESCO World Heritage Sites</p>
            </div>
          </div>
          
          <div className="dashboard-actions">
            <button 
              onClick={navigateToManageData}
              className="action-btn primary"
            >
              Manage Cultural Data
            </button>
            
            <button className="action-btn" onClick={handleViewReports}>
              View Reports
            </button>
            
            <button className="action-btn" onClick={handleSystemSettings}>
              System Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;