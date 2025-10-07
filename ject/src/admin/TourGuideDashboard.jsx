import React, { useState } from 'react';
import { Button, Card, CardContent, Typography, Grid, Box, Tabs, Tab, Chip, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import './Admin.css';

const tourSchedule = [
  { title: 'Red Fort Heritage Walk', date: '2025-09-28', time: '10:00 AM', participants: 15 },
  { title: 'Taj Mahal Sunrise Tour', date: '2025-09-29', time: '6:00 AM', participants: 20 },
  { title: 'Delhi Heritage Circuit', date: '2025-09-30', time: '9:00 AM', participants: 12 },
];

const guideStats = [
  { metric: 'Tours Conducted', count: 156 },
  { metric: 'Tourists Guided', count: '2.3K' },
  { metric: 'Average Rating', count: '4.8⭐' },
];

const popularDestinations = [
  { name: 'Taj Mahal', location: 'Agra', bookings: 45 },
  { name: 'Red Fort', location: 'Delhi', bookings: 38 },
  { name: 'Hawa Mahal', location: 'Jaipur', bookings: 32 },
];

const guideResources = [
  { title: 'Historical Facts Database', type: 'Reference' },
  { title: 'Multi-language Phrases', type: 'Language Guide' },
  { title: 'Emergency Contacts', type: 'Safety' },
];

function TourGuideDashboard() {
  const [tab, setTab] = useState(0);
  const handleTabChange = (e, newValue) => setTab(newValue);

  return (
    <div className="tour-guide-dashboard">
      <Box sx={{ mb: 3, textAlign: 'center' }}>
        <Typography variant="h5">Tour Guide Central </Typography>
        <Typography variant="body1">Guide visitors through India's incredible heritage</Typography>
      </Box>
      <Tabs value={tab} onChange={handleTabChange} centered sx={{ mb: 2 }}>
        <Tab label="Dashboard" />
        <Tab label="My Tours" />
        <Tab label="Schedule" />
        <Tab label="Destinations" />
        <Tab label="Resources" />
        <Tab label="Profile" />
      </Tabs>
      {tab === 0 && (
        <Box>
          <Typography variant="h6" sx={{ mb: 2 }}>Guide Performance</Typography>
          <Grid container spacing={2}>
            {guideStats.map((stat, idx) => (
              <Grid item xs={12} md={4} key={idx}>
                <Card sx={{ textAlign: 'center', p: 2 }}>
                  <Typography variant="h4" color="primary">{stat.count}</Typography>
                  <Typography variant="body2">{stat.metric}</Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>Upcoming Tours</Typography>
          <Grid container spacing={2}>
            {tourSchedule.slice(0, 3).map((tour, idx) => (
              <Grid item xs={12} md={4} key={idx}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{tour.title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {tour.date} at {tour.time}
                    </Typography>
                    <Chip 
                      label={`${tour.participants} participants`} 
                      color="primary" 
                      size="small" 
                      sx={{ mt: 1 }} 
                    />
                    <Button variant="outlined" size="small" sx={{ mt: 2, display: 'block' }}>
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
      {tab === 1 && (
        <Box>
          <Typography variant="h6" sx={{ mb: 2 }}>My Tour History</Typography>
          <Grid container spacing={2}>
            {tourSchedule.map((tour, idx) => (
              <Grid item xs={12} md={6} key={idx}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{tour.title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {tour.date} at {tour.time}
                    </Typography>
                    <Chip 
                      label={`${tour.participants} participants`} 
                      color="success" 
                      size="small" 
                      sx={{ mt: 1 }} 
                    />
                    <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                      <Button variant="outlined" size="small">Edit</Button>
                      <Button variant="outlined" size="small">Duplicate</Button>
                      <Button variant="outlined" size="small">Feedback</Button>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
      {tab === 2 && (
        <Box>
          <Typography variant="h6" sx={{ mb: 2 }}>Tour Schedule</Typography>
          <Button variant="contained" sx={{ mb: 2 }}>Add New Tour</Button>
          <Grid container spacing={2}>
            {tourSchedule.map((tour, idx) => (
              <Grid item xs={12} key={idx}>
                <Card>
                  <CardContent>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Box>
                        <Typography variant="h6">{tour.title}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {tour.date} at {tour.time} • {tour.participants} participants
                        </Typography>
                      </Box>
                      <Stack direction="row" spacing={1}>
                        <Button variant="outlined" size="small">Edit</Button>
                        <Button variant="outlined" size="small" color="error">Cancel</Button>
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
      {tab === 3 && (
        <Box>
          <Typography variant="h6" sx={{ mb: 2 }}>Popular Destinations</Typography>
          <Grid container spacing={2}>
            {popularDestinations.map((dest, idx) => (
              <Grid item xs={12} md={4} key={idx}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{dest.name}</Typography>
                    <Typography variant="body2" color="text.secondary">{dest.location}</Typography>
                    <Chip 
                      label={`${dest.bookings} bookings this month`} 
                      color="secondary" 
                      size="small" 
                      sx={{ mt: 1 }} 
                    />
                    <Button variant="outlined" size="small" sx={{ mt: 2, display: 'block' }}>
                      Create Tour
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
      {tab === 4 && (
        <Box>
          <Typography variant="h6" sx={{ mb: 2 }}>Guide Resources</Typography>
          <Grid container spacing={2}>
            {guideResources.map((resource, idx) => (
              <Grid item xs={12} md={4} key={idx}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{resource.title}</Typography>
                    <Chip label={resource.type} color="primary" size="small" sx={{ mt: 1 }} />
                    <Button variant="outlined" size="small" sx={{ mt: 2, display: 'block' }}>
                      Access Resource
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>Quick Tools</Typography>
          <Stack direction="row" spacing={2} flexWrap="wrap">
            <Button variant="contained">Weather Check</Button>
            <Button variant="contained">Emergency Contacts</Button>
            <Button variant="contained">Tourist Information</Button>
          </Stack>
        </Box>
      )}
      {tab === 5 && (
        <Box>
          <Typography variant="h6" sx={{ mb: 2 }}>Guide Profile</Typography>
          <Typography variant="body1">Manage your guide certification, languages, and specialties.</Typography>
          <Button variant="contained" sx={{ mt: 2 }}>Update Profile</Button>
        </Box>
      )}
    </div>
  );
}

export default TourGuideDashboard;