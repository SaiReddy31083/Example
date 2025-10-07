import React, { useState } from 'react';
import { TextField, Button, Select, MenuItem, InputLabel, FormControl, Typography, Box, Alert, Grid, Stack } from '@mui/material';
import './Frontend.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, this would send the form data to a server
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    
    // Reset form after submission
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <section style={{ minHeight: '100vh', background: 'linear-gradient(to right, #f0b153ff, #91b2eaff)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <fieldset style={{
        maxWidth: '500px',
        width: '100%',
        margin: '0 auto',
        borderRadius: '1rem',
        border: '2px solid #fff',
        background: 'rgba(7, 47, 193, 0.95)',
        color: '#fff',
        boxShadow: '0 0 32px 0 #0008',
        padding: '2.5rem 2rem',
        textAlign: 'center',
      }}>
        <legend style={{ fontSize: '2rem', fontWeight: 'bold', color: '#fff', letterSpacing: '2px', marginBottom: '1.5rem' }}>💬 Contact Us</legend>
        {isSubmitted ? (
          <div style={{ color: '#fff', marginTop: '2rem' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
            <h3 style={{ marginBottom: '1rem' }}>Thank You!</h3>
            <p>Your message has been sent successfully. We'll get back to you soon!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <p style={{ color: '#fff', fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '2rem' }}>Please share your thoughts, questions, or suggestions!</p>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Full Name"
              required
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
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email Address"
              required
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
            <select
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              required
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
            >
              <option value="">Select Subject</option>
              <option value="general">General Inquiry</option>
              <option value="cultural-data">Cultural Data Contribution</option>
              <option value="monument-info">Monument Information</option>
              <option value="collaboration">Collaboration Opportunity</option>
              <option value="technical">Technical Issue</option>
              <option value="feedback">Feedback & Suggestions</option>
            </select>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Your Message"
              required
              rows="5"
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
                resize: 'vertical',
              }}
            />
            <button 
              type="submit" 
              style={{
                width: '100%',
                padding: '0.9rem',
                borderRadius: '2rem',
                border: 'none',
                backgroundColor: '#4CAF50',
                color: '#fff',
                fontWeight: 'bold',
                fontSize: '1.1rem',
                boxShadow: '0 2px 8px #0006',
                cursor: 'pointer',
                marginBottom: '1.5rem',
                letterSpacing: '1px',
              }}
            >
              📤 Send Message
            </button>
          </form>
        )}
      </fieldset>
    </section>
  );
};

export default Contact;