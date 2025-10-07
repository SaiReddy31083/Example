import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { culturalData } from '../database/data.js';
import { Button, Typography, Box, Card, CardContent } from '@mui/material';


// Use public folder paths for images
const imageMap = {
  Diwali: '/diwali.png',
  Holi: '/holi.png',
  'Classical Dance Forms': '/classical.png',
  'Yoga and Meditation': '/yoga.png', // Replace with a yoga image if available
  'Ganesh Chaturthi': '/ganesh.png', // Replace with a Ganesh image if available
  Ayurveda: '/ayurveda.png', // Replace with an Ayurveda image if available
};

export default function CultureDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const item = culturalData.find((c) => c.id === Number(id));

  if (!item) {
    return <Typography variant="h6">Item not found.</Typography>;
  }

  return (
    <Box sx={{ maxWidth: 700, mx: 'auto', mt: 4, p: 2 }}>
      <Button variant="outlined" onClick={() => navigate(-1)} sx={{ mb: 2 }}>Back</Button>
      <Card>
        <CardContent>
          <Typography variant="h4" gutterBottom>{item.name}</Typography>
          <img 
            src={imageMap[item.name] || '/india.png'} 
            alt={item.name} 
            style={{ width: '100%', maxHeight: 350, objectFit: 'cover', borderRadius: 12, marginBottom: 16 }}
          />
          <Typography variant="body1" sx={{ mb: 2 }}>{item.description}</Typography>
          <Typography variant="subtitle1"><strong>Region:</strong> {item.region}</Typography>
          <Typography variant="subtitle1"><strong>Season:</strong> {item.season}</Typography>
          <Typography variant="subtitle1"><strong>Significance:</strong> {item.significance}</Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
