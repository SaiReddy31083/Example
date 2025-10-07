import React, { createContext, useContext, useState } from 'react';
import { UserProgressProvider } from './context/UserProgressContext';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import './App.css';

// Frontend Pages
import Home from './frontend/Home';
import About from './frontend/About';
import Culture from './frontend/Culture';
import CultureDetail from './frontend/CultureDetail';
import Heritage from './frontend/Heritage';
import HeritageDetail from './frontend/HeritageDetail';
import Monuments from './frontend/Monuments';
import Contact from './frontend/Contact';

// Admin Pages
import Admin from './admin/Admin';
import ManageData from './admin/ManageData';
import ViewReports from './admin/ViewReports';
import CulturalEnthusiastDashboard from './admin/CulturalEnthusiastDashboard';
import CulturalEnthusiastLogin from './admin/CulturalEnthusiastLogin';

// User Role Components
import UserLogin from './admin/UserLogin';
import UserDashboard from './admin/UserDashboard';
import UserSignup from './admin/UserSignup';
import ContentCreatorLogin from './admin/ContentCreatorLogin';
import ContentCreatorDashboard from './admin/ContentCreatorDashboard';
import ContentCreatorSignup from './admin/ContentCreatorSignup';
import TourGuideLogin from './admin/TourGuideLogin';
import TourGuideDashboard from './admin/TourGuideDashboard';
import TourGuideSignup from './admin/TourGuideSignup';
import AdminSignup from './admin/AdminSignup';

// Components
import LoginCredentialsReference from './components/LoginCredentialsReference';
import ProtectedUserRoute from './components/ProtectedUserRoute';

// Services
import { loadRegisteredUsers } from './services/authService';

// Language Context
export const LanguageContext = createContext({ language: 'en', setLanguage: () => {} });

// Navigation Component
const Navigation = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  if (isAdminRoute) {
    return null;
  }

  const { language, setLanguage } = useContext(LanguageContext);
  const languages = [
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'Hindi' },
    { code: 'te', label: 'Telugu' },
    { code: 'ta', label: 'Tamil' },
    { code: 'bn', label: 'Bengali' },
    { code: 'mr', label: 'Marathi' },
    { code: 'gu', label: 'Gujarati' },
    { code: 'kn', label: 'Kannada' },
    { code: 'ml', label: 'Malayalam' },
    { code: 'pa', label: 'Punjabi' }
  ];

  const [selectedRole, setSelectedRole] = useState("");
  return (
    <nav className="main-nav">
      <div className="nav-container">
        <Link to="/" className="nav-brand">
          🇮🇳 Indian Heritage
        </Link>
        <div className="nav-links">
          <Link 
            to="/" 
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            Home
          </Link>
          <Link 
            to="/about" 
            className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}
          >
            About
          </Link>
          <Link 
            to="/contact" 
            className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`}
          >
            Contact
          </Link>
          {/* Admin button removed */}
          <select
            className="nav-link role-select"
            defaultValue=""
            onChange={e => setSelectedRole(e.target.value)}
            aria-label="Select Role"
          >
            <option value="" disabled>Select Role</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
            <option value="content-creator">Content Creator</option>
            <option value="tour-guide">Tour Guide</option>
          </select>
          {selectedRole && (
            <button
              className="nav-link login-btn"
              style={{ marginLeft: '0.7rem', padding: '0.3rem 1rem', borderRadius: '6px', border: '1px solid #1976d2', background: '#1976d2', color: '#fff', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer' }}
              onClick={() => {
                if (selectedRole === 'admin') {
                  window.location.href = '/admin';
                } else if (selectedRole === 'user') {
                  window.location.href = '/admin/user-login';
                } else if (selectedRole === 'content-creator') {
                  window.location.href = '/admin/content-creator-login';
                } else if (selectedRole === 'tour-guide') {
                  window.location.href = '/admin/tour-guide-login';
                }
              }}
            >
              Login
            </button>
          )}
          <select
            className="nav-link language-select"
            value={language}
            onChange={e => setLanguage(e.target.value)}
            aria-label="Select Language"
          >
            {languages.map(lang => (
              <option key={lang.code} value={lang.code}>{lang.label}</option>
            ))}
          </select>
        </div>
      </div>
    </nav>
  );
};

// Footer Component
const Footer = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  if (isAdminRoute) {
    return (
      <footer className="admin-footer">
        <div className="footer-container">
          <p>&copy; 2025 Indian Heritage Admin Panel. All rights reserved.</p>
        </div>
      </footer>
    );
  }

  return (
    <footer className="main-footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Indian Heritage</h3>
            <p>
              Preserving and promoting India's incredible cultural heritage 
              for future generations.
            </p>
          </div>
          
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/about">About</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Contact</h4>
            <p>📧 2400031083@kluniversity.in</p>
             <p>📧 2400032911@kluniversity.in</p>
            <p>📱 +91 9398945639</p>
            <p>📱 +91 9989493955</p>
            <p>📍 Andhra Pradesh, India</p>
          </div>
          
          <div className="footer-section">
            <h4>Follow Us</h4>
            <div className="footer-social">
              <a href="#" title="Facebook">📘</a>
              <a href="#" title="Twitter">🐦</a>
              <a href="#" title="Instagram">📷</a>
              <a href="#" title="YouTube">📺</a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2025 Indian Culture & Heritage Awareness Website. All rights reserved.</p>
          <p>Made with ❤️ for preserving Indian culture and heritage.</p>
        </div>
      </div>
    </footer>
  );
};

function App() {
  const [language, setLanguage] = useState('en');
  
  // Load registered users on app start
  React.useEffect(() => {
    loadRegisteredUsers();
  }, []);
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      <UserProgressProvider>
        <Router>
          <div className="App">
            <Navigation />
            <main className="main-content">
              <Routes>
              {/* Frontend Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              
              {/* Protected Routes - Require User Login */}
              <Route path="/culture" element={<ProtectedUserRoute><Culture /></ProtectedUserRoute>} />
              <Route path="/culture/:id" element={<ProtectedUserRoute><CultureDetail /></ProtectedUserRoute>} />
              <Route path="/heritage" element={<ProtectedUserRoute><Heritage /></ProtectedUserRoute>} />
              <Route path="/monuments" element={<ProtectedUserRoute><Monuments /></ProtectedUserRoute>} />
              <Route path="/monuments/:id" element={<ProtectedUserRoute><HeritageDetail /></ProtectedUserRoute>} />
              {/* Admin Routes */}
              <Route path="/admin" element={<Admin />} />
              <Route path="/admin/manage-data" element={<ManageData />} />
              <Route path="/admin/view-reports" element={<ViewReports />} />
              
              {/* Cultural Enthusiast Routes */}
              <Route path="/admin/enthusiast-dashboard" element={<CulturalEnthusiastDashboard />} />
              <Route path="/admin/enthusiast-login" element={<CulturalEnthusiastLogin />} />
              <Route path="/admin/admin-signup" element={<AdminSignup />} />
              
              {/* User Routes */}
              <Route path="/admin/user-login" element={<UserLogin />} />
              <Route path="/admin/user-dashboard" element={<UserDashboard />} />
              <Route path="/admin/user-signup" element={<UserSignup />} />
              
              {/* Content Creator Routes */}
              <Route path="/admin/content-creator-login" element={<ContentCreatorLogin />} />
              <Route path="/admin/content-creator-dashboard" element={<ContentCreatorDashboard />} />
              <Route path="/admin/content-creator-signup" element={<ContentCreatorSignup />} />
              
              {/* Tour Guide Routes */}
              <Route path="/admin/tour-guide-login" element={<TourGuideLogin />} />
              <Route path="/admin/tour-guide-dashboard" element={<TourGuideDashboard />} />
              <Route path="/admin/tour-guide-signup" element={<TourGuideSignup />} />
              
              {/* Login Credentials Reference */}
              <Route path="/login-credentials" element={<LoginCredentialsReference />} />
              
              {/* 404 Route */}
              <Route path="*" element={
                <div className="not-found">
                  <div className="container">
                    <h1>404 - Page Not Found</h1>
                    <p>The page you're looking for doesn't exist.</p>
                    <Link to="/" className="btn btn-primary">Go Home</Link>
                  </div>
                </div>
              } />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </UserProgressProvider>
    </LanguageContext.Provider>
  );
}

export default App;
