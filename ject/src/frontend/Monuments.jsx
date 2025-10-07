import React, { useState } from 'react';
import { useUserProgress } from '../context/UserProgressContext';
import { TextField, Select, MenuItem, Button, Card, CardContent, CardActions, Dialog, DialogTitle, DialogContent, DialogActions, InputLabel, FormControl, Typography, Box, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../services/authService';
import { monumentData } from '../database/data.js';
import './Frontend.css';

const Monuments = () => {
  const { incrementHeritagesAttended } = useUserProgress();
  const [selectedMonument, setSelectedMonument] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState('all');
  const navigate = useNavigate();

  const handleBackClick = () => {
    const currentUser = getCurrentUser();
    if (currentUser && currentUser.role === 'user') {
      navigate('/admin/user-dashboard');
    } else {
      navigate(-1); // Go back to previous page
    }
  };

  // Filter monuments based on search and state
  const filteredMonuments = monumentData.filter(monument => {
    const matchesSearch = monument.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         monument.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesState = selectedState === 'all' || 
                        monument.location.toLowerCase().includes(selectedState.toLowerCase());
    return matchesSearch && matchesState;
  });

  // Get unique states from monument data
  const states = [...new Set(monumentData.map(m => {
    const location = m.location.split(',');
    return location[location.length - 1].trim();
  }))].sort();

  const openMonumentDetails = (monument) => {
    incrementHeritagesAttended();
    navigate(`/monuments/${monument.id}`);
  };

  const closeMonumentDetails = () => {
    setSelectedMonument(null);
  };

  return (
    <div className="monuments-container">
      <div className="container">
        {/* Header Section */}
        <section className="monuments-header" style={{ position: 'relative' }}>
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
          <h1>Famous Indian Monuments</h1>
          <p className="page-subtitle">
            Explore the architectural masterpieces that tell the story of India's 
            rich history, from ancient temples to Mughal marvels
          </p>
        </section>

        {/* Search and Filter Section */}
        <section className="monuments-filters">
          <div className="filter-row">
            <div className="search-container">
              <input
                  as={TextField}
                  label="Search monuments or locations..."
                  variant="outlined"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  fullWidth
                  size="small"
                />
            </div>
            
            <div className="state-filter">
              <FormControl fullWidth size="small">
                <InputLabel id="state-select-label">State</InputLabel>
                <Select
                  labelId="state-select-label"
                  value={selectedState}
                  label="State"
                  onChange={(e) => setSelectedState(e.target.value)}
                >
                  <MenuItem value="all">All States</MenuItem>
                  {states.map(state => (
                    <MenuItem key={state} value={state}>{state}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>
        </section>

        {/* Monuments Grid */}
        <section className="monuments-grid-section">
          {filteredMonuments.length === 0 ? (
            <div className="no-results">
              <p>No monuments found matching your search criteria.</p>
            </div>
          ) : (
            <Box className="monuments-grid" display="flex" flexWrap="wrap" gap={2}>
              {filteredMonuments.map(monument => (
                <Card key={monument.id} sx={{ width: 300 }}>
                  <CardContent>
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                      <Typography variant="h6">{monument.name}</Typography>
                      <Chip label={monument.type} color="primary" size="small" />
                    </Box>
                    <Typography variant="body2" color="text.secondary">📍 {monument.location}</Typography>
                    <Typography variant="body2">🕰️ Built: {monument.built}</Typography>
                    <Typography variant="body2">👑 Builder: {monument.builder}</Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      {monument.description.length > 120 
                        ? `${monument.description.substring(0, 120)}...` 
                        : monument.description}
                    </Typography>
                    <Box mt={1}>
                      <Typography variant="caption">Entry Fee: {monument.entryFee}</Typography>
                    </Box>
                  </CardContent>
                  <CardActions>
                    <Button variant="contained" size="small" onClick={() => openMonumentDetails(monument)}>
                      Learn More
                    </Button>
                  </CardActions>
                </Card>
              ))}
            </Box>
          )}
        </section>

        {/* Monument Categories */}
        <section className="monument-categories">
          <h2 className="section-title">Architectural Styles</h2>
          <div className="categories-showcase">
            <div className="category-item">
              <div className="category-icon">🕌</div>
              <h3>Mughal Architecture</h3>
              <p>
                Characterized by onion domes, pointed arches, and intricate inlay work. 
                Examples include the Taj Mahal and Red Fort.
              </p>
            </div>
            
            <div className="category-item">
              <div className="category-icon">🛕</div>
              <h3>Hindu Temple Architecture</h3>
              <p>
                Features elaborate sculptures, towering spires (shikhara), and 
                detailed carvings depicting mythological stories.
              </p>
            </div>
            
            <div className="category-item">
              <div className="category-icon">🏰</div>
              <h3>Indo-Islamic Style</h3>
              <p>
                A fusion of Islamic and Indian architectural elements, creating 
                unique structures like the Qutub Minar.
              </p>
            </div>
            
            <div className="category-item">
              <div className="category-icon">🏯</div>
              <h3>Colonial Architecture</h3>
              <p>
                British-era buildings that blend European styles with local 
                adaptations, like the Gateway of India.
              </p>
            </div>
          </div>
        </section>

        {/* Visitor Information */}
        <section className="visitor-info">
          <h2 className="section-title">Planning Your Visit</h2>
          <div className="info-grid">
            <div className="info-card">
              <div className="info-icon">🎫</div>
              <h3>Tickets & Timing</h3>
              <p>
                Most monuments have different entry fees for Indian and foreign tourists. 
                It's recommended to visit during early morning or late afternoon for 
                better experience and photography.
              </p>
            </div>
            
            <div className="info-card">
              <div className="info-icon">📱</div>
              <h3>Digital Services</h3>
              <p>
                Many monuments now offer online ticket booking, audio guides, and 
                virtual tour options. Check the official ASI website for updates.
              </p>
            </div>
            
            <div className="info-card">
              <div className="info-icon">🌡️</div>
              <h3>Best Time to Visit</h3>
              <p>
                October to March is generally the best time to visit most monuments 
                in India due to pleasant weather conditions.
              </p>
            </div>
            
            <div className="info-card">
              <div className="info-icon">📷</div>
              <h3>Photography Guidelines</h3>
              <p>
                While photography is allowed in most areas, some monuments charge 
                extra for cameras. Flash photography inside monuments is usually prohibited.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Monument Details Modal */}
      {selectedMonument && (
        <Dialog open={true} onClose={closeMonumentDetails} maxWidth="sm" fullWidth>
          <DialogTitle>{selectedMonument.name}</DialogTitle>
          <DialogContent dividers>
            <Box mb={2}>
              <Typography variant="subtitle1">Basic Information</Typography>
              <Box display="flex" flexWrap="wrap" gap={2} mt={1}>
                <Typography variant="body2"><strong>Location:</strong> {selectedMonument.location}</Typography>
                <Typography variant="body2"><strong>Built:</strong> {selectedMonument.built}</Typography>
                <Typography variant="body2"><strong>Builder:</strong> {selectedMonument.builder}</Typography>
                <Typography variant="body2"><strong>Type:</strong> {selectedMonument.type}</Typography>
              </Box>
            </Box>
            <Box mb={2}>
              <Typography variant="subtitle1">Description</Typography>
              <Typography variant="body2">{selectedMonument.description}</Typography>
            </Box>
            <Box mb={2}>
              <Typography variant="subtitle1">Architecture</Typography>
              <Typography variant="body2">{selectedMonument.architecture}</Typography>
            </Box>
            <Box mb={2}>
              <Typography variant="subtitle1">Visitor Information</Typography>
              <Box display="flex" flexWrap="wrap" gap={2} mt={1}>
                <Typography variant="body2"><strong>Visiting Hours:</strong> {selectedMonument.visitingHours}</Typography>
                <Typography variant="body2"><strong>Entry Fee:</strong> {selectedMonument.entryFee}</Typography>
                <Typography variant="body2"><strong>Significance:</strong> {selectedMonument.significance}</Typography>
              </Box>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeMonumentDetails} color="primary">Close</Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default Monuments;