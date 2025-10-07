import React, { useState } from 'react';
import { useUserProgress } from '../context/UserProgressContext';
import { culturalData } from '../database/data.js';
import { TextField, Button, Card, CardContent, Typography, Box, Chip, Grid, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../services/authService';
import './Frontend.css';

const Culture = () => {
  const [selectedType, setSelectedType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const { incrementCulturalEvents, incrementTraditionsExplored } = useUserProgress();

  // Filter data based on selected type and search term
  const filteredData = culturalData.filter(item => {
    const matchesType = selectedType === 'all' || item.type === selectedType;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  const uniqueTypes = [...new Set(culturalData.map(item => item.type))];

  const handleBackClick = () => {
    const currentUser = getCurrentUser();
    if (currentUser && currentUser.role === 'user') {
      navigate('/admin/user-dashboard');
    } else {
      navigate(-1); // Go back to previous page
    }
  };

  return (
    <div className="culture-container">
      <div className="container">
        {/* Header Section */}
        <section className="culture-header" style={{ position: 'relative' }}>
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
          <h1>Indian Cultural Traditions</h1>
          <p className="page-subtitle">
            Explore the vibrant festivals, ancient traditions, and cultural practices 
            that form the heart of Indian civilization
          </p>
        </section>

        {/* Filter Section */}
        <section className="filter-section">
          <div className="filter-controls">
            <div className="search-box">
              <TextField
                label="Search cultural traditions..."
                variant="outlined"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                fullWidth
                size="small"
              />
            </div>
            
            <div className="type-filters">
              <Stack direction="row" spacing={1}>
                <Button
                  variant={selectedType === 'all' ? 'contained' : 'outlined'}
                  color="primary"
                  size="small"
                  onClick={() => setSelectedType('all')}
                >
                  All
                </Button>
                {uniqueTypes.map(type => (
                  <Button
                    key={type}
                    variant={selectedType === type ? 'contained' : 'outlined'}
                    color="primary"
                    size="small"
                    onClick={() => setSelectedType(type)}
                  >
                    {type}
                  </Button>
                ))}
              </Stack>
            </div>
          </div>
        </section>

        {/* Cultural Data Display */}
        <section className="culture-content">
          {filteredData.length === 0 ? (
            <div className="no-results">
              <p>No cultural traditions found matching your criteria.</p>
            </div>
          ) : (
            <Grid container spacing={3} className="culture-grid">
              {filteredData.map(item => (
                <Grid item xs={12} md={6} lg={4} key={item.id}>
                  <Card
                    sx={{
                      height: 360,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      borderRadius: 4,
                      boxShadow: '0 6px 24px rgba(25, 118, 210, 0.10)',
                      background: item.type === 'Festival'
                        ? 'linear-gradient(135deg, #FFF3E0 0%, #FFE0B2 100%)'
                        : item.type === 'Tradition'
                        ? 'linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%)'
                        : 'linear-gradient(135deg, #F3E5F5 0%, #E1BEE7 100%)',
                      border: item.type === 'Festival'
                        ? '2px solid #FF9800'
                        : item.type === 'Tradition'
                        ? '2px solid #1976D2'
                        : '2px solid #8E24AA',
                      transition: 'transform 0.2s',
                      '&:hover': {
                        transform: 'translateY(-6px) scale(1.03)',
                        boxShadow: '0 12px 32px rgba(25, 118, 210, 0.18)',
                      },
                    }}
                  >
                    <CardContent 
                      sx={{ 
                        flex: 1, 
                        display: 'flex', 
                        flexDirection: 'column', 
                        justifyContent: 'space-between', 
                        height: 270, /* fixed height for content */
                        overflow: 'hidden',
                        pb: '0 !important',
                      }}
                    >
                      <Box display="flex" alignItems="center" justifyContent="space-between">
                        <Typography variant="h6">{item.name}</Typography>
                        <Chip label={item.type} color="primary" size="small" />
                      </Box>
                      <Typography variant="body2" sx={{ mt: 1 }}>{item.description}</Typography>
                      <Box mt={1}>
                        <Typography variant="caption"><strong>Region:</strong> {item.region}</Typography><br/>
                        <Typography variant="caption"><strong>Season:</strong> {item.season}</Typography><br/>
                        <Typography variant="caption"><strong>Significance:</strong> {item.significance}</Typography>
                      </Box>
                      <Box mt={2} textAlign="right">
                        <Typography variant="h4">
                          {item.type === 'Festival' ? '🎉' : 
                           item.type === 'Tradition' ? '🕉️' : 
                           item.type === 'Art Form' ? '🎭' : '🌸'}
                        </Typography>
                      </Box>
                      {/* Explore Button for Festivals and Traditions */}
                      {item.type === 'Festival' && (
                        <Button 
                          variant="contained" 
                          color="success" 
                          size="small" 
                          sx={{ mt: 2, mr: 1 }}
                          onClick={() => {
                            incrementCulturalEvents();
                            navigate(`/culture/${item.id}`);
                          }}
                        >
                          Explore
                        </Button>
                      )}
                      {item.type === 'Tradition' && (
                        <Button 
                          variant="contained" 
                          color="secondary" 
                          size="small" 
                          sx={{ mt: 2 }}
                          onClick={() => {
                            incrementTraditionsExplored();
                            navigate(`/culture/${item.id}`);
                          }}
                        >
                          Explore
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </section>

        {/* Cultural Insights Section */}
        <section className="insights-section">
          <h2 className="section-title">Understanding Indian Culture</h2>
          <div className="insights-grid">
            <div className="insight-card">
              <div className="insight-icon">🎊</div>
              <h3>Festivals</h3>
              <p>
                Indian festivals are colorful celebrations that bring communities together, 
                marking religious occasions, seasonal changes, and cultural milestones with 
                joy, music, and traditional foods.
              </p>
            </div>
            
            <div className="insight-card">
              <div className="insight-icon">🧘</div>
              <h3>Spiritual Practices</h3>
              <p>
                Ancient traditions like yoga, meditation, and Ayurveda offer holistic 
                approaches to wellness, combining physical, mental, and spiritual practices 
                for complete well-being.
              </p>
            </div>
            
            <div className="insight-card">
              <div className="insight-icon">💃</div>
              <h3>Art Forms</h3>
              <p>
                Classical dance forms, music, and performing arts are not just entertainment 
                but spiritual expressions that tell stories, preserve history, and connect 
                people to their cultural roots.
              </p>
            </div>
          </div>
        </section>

        {/* Cultural Values Section */}
        <section className="values-showcase">
          <div className="values-content">
            <h2>Core Cultural Values</h2>
            <div className="values-list">
              <div className="value-item">
                <span className="value-symbol">🕊️</span>
                <div>
                  <h4>Ahimsa (Non-violence)</h4>
                  <p>The principle of non-harm towards all living beings</p>
                </div>
              </div>
              
              <div className="value-item">
                <span className="value-symbol">🙏</span>
                <div>
                  <h4>Respect for Elders</h4>
                  <p>Honoring wisdom and experience of older generations</p>
                </div>
              </div>
              
              <div className="value-item">
                <span className="value-symbol">🤲</span>
                <div>
                  <h4>Seva (Service)</h4>
                  <p>Selfless service to others and society</p>
                </div>
              </div>
              
              <div className="value-item">
                <span className="value-symbol">☮️</span>
                <div>
                  <h4>Vasudhaiva Kutumbakam</h4>
                  <p>"The world is one family" - universal brotherhood</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Culture;