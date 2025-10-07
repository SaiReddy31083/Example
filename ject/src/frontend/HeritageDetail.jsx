import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { monumentData } from '../database/data.js';
import { Button, Typography, Box, Card, CardContent } from '@mui/material';

const imageMap = {
  'Taj Mahal': '/india.png',
  'Qutub Minar': '/image.png',
  // Add more mappings as needed
};

export default function HeritageDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const item = monumentData.find((m) => m.id === Number(id));

  if (!item) {
    return <Typography variant="h6">Heritage site not found.</Typography>;
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
          <Typography variant="subtitle1"><strong>Location:</strong> {item.location}</Typography>
          <Typography variant="subtitle1"><strong>Built:</strong> {item.built}</Typography>
          <Typography variant="subtitle1"><strong>Builder:</strong> {item.builder}</Typography>
          <Typography variant="subtitle1"><strong>Entry Fee:</strong> {item.entryFee}</Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
