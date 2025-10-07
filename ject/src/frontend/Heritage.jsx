import React, { useState } from 'react';
import { useUserProgress } from '../context/UserProgressContext';
import { heritageSites } from '../database/data.js';
import { Card, CardContent, Typography, Box, Grid, Button, Chip, Dialog, DialogTitle, DialogContent, DialogActions, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../services/authService';
import './Frontend.css';

const Heritage = () => {
  const { incrementHeritagesAttended } = useUserProgress();
  const [selectedSite, setSelectedSite] = useState(null);
  const navigate = useNavigate();

  const handleBackClick = () => {
    const currentUser = getCurrentUser();
    if (currentUser && currentUser.role === 'user') {
      navigate('/admin/user-dashboard');
    } else {
      navigate(-1); // Go back to previous page
    }
  };

  const openSiteDetails = (site) => {
    incrementHeritagesAttended();
    setSelectedSite(site);
  };

  const closeSiteDetails = () => {
    setSelectedSite(null);
  };

  return (
    <div className="heritage-container">
      <div className="container">
        {/* Header Section */}
        <section className="heritage-header" style={{ position: 'relative' }}>
          {/* Back Button */}
          <Button 
            onClick={handleBackClick}
            variant="contained"
            size="small"
            sx={{ 
              position: 'absolute', 
              left: '0', 
              top: '0',
              minWidth: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: 'rgba(25, 118, 210, 0.9)',
              color: 'white',
              '&:hover': {
                backgroundColor: 'rgba(25, 118, 210, 1)',
              },
              zIndex: 10,
              fontSize: '18px',
              fontWeight: 'bold'
            }}
            title="Back to Dashboard"
          >
            ←
          </Button>
          <h1>India's Heritage Sites</h1>
          <p className="page-subtitle">
            Discover the UNESCO World Heritage Sites and ancient monuments that 
            showcase India's glorious past and architectural marvels
          </p>
        </section>

       

        {/* Heritage Sites Grid */}
        <section className="heritage-sites">
          <h2 className="section-title">Featured Heritage Sites</h2>
          <Grid container spacing={3} className="sites-grid">
            {heritageSites.map(site => (
              <Grid item xs={12} md={6} lg={4} key={site.id}>
                <Card>
                  <CardContent>
                    <Typography variant="h5">{site.name}</Typography>
                    <Typography variant="body2" color="text.secondary">📍 {site.location}</Typography>
                    <Typography variant="body2">🕰️ {site.period}</Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>{site.description}</Typography>
                    <Box mt={1}>
                      <Chip label={site.significance} color="primary" size="small" />
                    </Box>
                  </CardContent>
                  <Box px={2} pb={2}>
                    <Button variant="contained" size="small" onClick={() => openSiteDetails(site)}>
                      Learn More
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </section>

        {/* Heritage Categories */}
        <section className="heritage-categories">
          <h2 className="section-title">Types of Heritage</h2>
          <div className="categories-grid">
            <div className="category-card">
              <div className="category-icon">🏛️</div>
              <h3>Architectural Marvels</h3>
              <p>
                Ancient temples, forts, palaces, and monuments that showcase 
                India's architectural brilliance across different dynasties and periods.
              </p>
              <ul>
                <li>Mughal Architecture</li>
                <li>Dravidian Temples</li>
                <li>Indo-Islamic Monuments</li>
                <li>Buddhist Stupas</li>
              </ul>
            </div>
            
            <div className="category-card">
              <div className="category-icon">🌿</div>
              <h3>Natural Heritage</h3>
              <p>
                Biodiverse ecosystems, national parks, and natural landscapes 
                that represent India's incredible biodiversity and natural beauty.
              </p>
              <ul>
                <li>Western Ghats</li>
                <li>Kaziranga National Park</li>
                <li>Nanda Devi National Park</li>
                <li>Sundarbans National Park</li>
              </ul>
            </div>
            
            <div className="category-card">
              <div className="category-icon">🎨</div>
              <h3>Cultural Landscapes</h3>
              <p>
                Sites that represent the interaction between humans and nature, 
                showcasing traditional land use and cultural practices.
              </p>
              <ul>
                <li>Sacred Groves</li>
                <li>Cultural Terraces</li>
                <li>Historic Gardens</li>
                <li>Living Heritage Sites</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Conservation Efforts */}
        <section className="conservation-section">
          <div className="conservation-content">
            <h2>Heritage Conservation</h2>
            <div className="conservation-grid">
              <div className="conservation-text">
                <p>
                  Preserving India's heritage sites requires continuous effort from 
                  government agencies, international organizations, and local communities. 
                  The Archaeological Survey of India (ASI) works tirelessly to maintain 
                  and protect these invaluable cultural treasures.
                </p>
                
                <h3>Key Conservation Challenges</h3>
                <ul className="challenges-list">
                  <li>Environmental factors and climate change</li>
                  <li>Urban development and population pressure</li>
                  <li>Tourism impact management</li>
                  <li>Funding and resource allocation</li>
                  <li>Traditional craft and skill preservation</li>
                </ul>
              </div>
              
              <div className="conservation-initiatives">
                <h3>Conservation Initiatives</h3>
                <div className="initiative-item">
                  <span className="initiative-icon">🔬</span>
                  <div>
                    <h4>Scientific Restoration</h4>
                    <p>Using modern technology for precise restoration and maintenance</p>
                  </div>
                </div>
                
                <div className="initiative-item">
                  <span className="initiative-icon">👥</span>
                  <div>
                    <h4>Community Involvement</h4>
                    <p>Engaging local communities in heritage preservation efforts</p>
                  </div>
                </div>
                
                <div className="initiative-item">
                  <span className="initiative-icon">📚</span>
                  <div>
                    <h4>Documentation</h4>
                    <p>Digital archiving and comprehensive documentation of heritage</p>
                  </div>
                </div>
                
                <div className="initiative-item">
                  <span className="initiative-icon">🌱</span>
                  <div>
                    <h4>Sustainable Tourism</h4>
                    <p>Promoting responsible tourism that supports conservation</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Site Details Modal */}
      {selectedSite && (
        <Dialog open={true} onClose={closeSiteDetails} maxWidth="sm" fullWidth>
          <DialogTitle>{selectedSite.name}</DialogTitle>
          <DialogContent dividers>
            <Box mb={2}>
              <Typography variant="subtitle1">Location</Typography>
              <Typography variant="body2">{selectedSite.location}</Typography>
            </Box>
            <Box mb={2}>
              <Typography variant="subtitle1">Period</Typography>
              <Typography variant="body2">{selectedSite.period}</Typography>
            </Box>
            <Box mb={2}>
              <Typography variant="subtitle1">Description</Typography>
              <Typography variant="body2">{selectedSite.description}</Typography>
            </Box>
            <Box mb={2}>
              <Typography variant="subtitle1">Significance</Typography>
              <Typography variant="body2">{selectedSite.significance}</Typography>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeSiteDetails} color="primary">Close</Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default Heritage;