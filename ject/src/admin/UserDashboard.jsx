import React, { useState, useEffect } from 'react';
import { monumentData } from '../database/data.js';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Button, Card, CardContent, Typography, Grid, Box, Tabs, Tab, Chip, Avatar, Stack, Badge, IconButton, Radio, RadioGroup, FormControlLabel } from '@mui/material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useUserProgress } from '../context/UserProgressContext';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './Admin.css';


const userFavorites = [
  { name: 'Taj Mahal', type: 'Monument', visited: true },
  { name: 'Diwali', type: 'Festival', visited: false },
  { name: 'Classical Dance', type: 'Art Form', visited: false },
];

const userRecommendations = [
  { name: 'Hampi Ruins', type: 'Heritage Site' },
  { name: 'Kathakali Dance', type: 'Performance' },
  { name: 'Navratri Festival', type: 'Festival' },
];

// Quiz questions for Learning section

const allQuizQuestions = [
  {
    question: 'Which monument is known as the symbol of eternal love?',
    options: ['Qutub Minar', 'Taj Mahal', 'Red Fort', 'Gateway of India'],
    answer: 'Taj Mahal',
  },
  {
    question: 'Which festival is known as the festival of lights?',
    options: ['Holi', 'Diwali', 'Ganesh Chaturthi', 'Navratri'],
    answer: 'Diwali',
  },
  {
    question: 'Which ancient practice is associated with holistic wellness?',
    options: ['Ayurveda', 'Mughal Architecture', 'Colonial Rule', 'Independence Day'],
    answer: 'Ayurveda',
  },
  {
    question: 'Where is the Sun Temple located?',
    options: ['Konark', 'Delhi', 'Agra', 'Varanasi'],
    answer: 'Konark',
  },
  {
    question: 'Which dance form is native to Kerala?',
    options: ['Kathakali', 'Bharatanatyam', 'Odissi', 'Kuchipudi'],
    answer: 'Kathakali',
  },
  {
    question: 'Which city is known as the Pink City?',
    options: ['Jaipur', 'Mumbai', 'Chennai', 'Kolkata'],
    answer: 'Jaipur',
  },
  {
    question: 'Which river is considered the holiest in India?',
    options: ['Ganga', 'Yamuna', 'Godavari', 'Narmada'],
    answer: 'Ganga',
  },
  {
    question: 'Which festival celebrates the victory of good over evil with colors?',
    options: ['Holi', 'Pongal', 'Baisakhi', 'Onam'],
    answer: 'Holi',
  },
  {
    question: 'Who built the Red Fort in Delhi?',
    options: ['Shah Jahan', 'Akbar', 'Aurangzeb', 'Babur'],
    answer: 'Shah Jahan',
  },
  {
    question: 'Which is the largest state in India by area?',
    options: ['Rajasthan', 'Maharashtra', 'Uttar Pradesh', 'Madhya Pradesh'],
    answer: 'Rajasthan',
  },
];

function UserDashboard() {
  const { culturalEventsAttended, traditionsExplored, heritagesAttended, learningModulesCompleted, incrementLearningModulesCompleted } = useUserProgress();
  // Quiz state
  const [quizOpen, setQuizOpen] = useState(false);
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState([]);
  const [quizAttempts, setQuizAttempts] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState([]);

  // Shuffle function
  function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
  const [visitedSites, setVisitedSites] = useState([]);
  const [showSitesDialog, setShowSitesDialog] = useState(false);
  const [tab, setTab] = useState(0);
  const [previousPage, setPreviousPage] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleTabChange = (e, newValue) => setTab(newValue);

  useEffect(() => {
    // Check if user came from a specific page via URL params or sessionStorage
    const urlParams = new URLSearchParams(location.search);
    const redirectFrom = urlParams.get('from') || sessionStorage.getItem('previousPage');
    
    if (redirectFrom) {
      setPreviousPage(redirectFrom);
      // Clear from sessionStorage after using it
      sessionStorage.removeItem('previousPage');
    }
  }, [location]);

  const handleBackClick = () => {
    if (previousPage) {
      navigate(previousPage);
    } else {
      navigate(-1); // Go back to previous page in history
    }
  };

  // Dynamic userProgress array
  const userProgress = [
    { activity: 'Heritage Sites Visited', count: heritagesAttended },
    { activity: 'Cultural Events Attended', count: culturalEventsAttended },
    { activity: 'Traditions Explored', count: traditionsExplored },
    { activity: 'Learning Modules Completed', count: learningModulesCompleted },
  ];

  return (
    <div
      className="user-dashboard"
      style={{
        minHeight: '100vh',
        background: '#f5f7fa',
      }}
    >
      {/* Heading at the very top with Back to Site button on left and Logout button on right */}
      <Box sx={{
        width: '100%',
        background: '#1976d2',
        color: '#fff',
        py: 3,
        display: 'flex',
        alignItems: 'center',
        boxShadow: '0 2px 8px rgba(25,118,210,0.08)',
        mb: 3,
      }}>
        <Button
          variant="contained"
          color="secondary"
          sx={{
            fontWeight: 'bold',
            fontSize: '1rem',
            px: 3,
            ml: 3,
            boxShadow: '0 2px 8px rgba(67,206,162,0.15)',
          }}
          onClick={() => navigate('/')}
        >
          Back to Site
        </Button>
        <Box sx={{ flex: 1, textAlign: 'center', fontWeight: 'bold', fontSize: { xs: '2rem', md: '2.5rem' }, letterSpacing: 1 }}>
          Welcome User! 🇮🇳
        </Box>
        <Button
          variant="contained"
          color="error"
          sx={{
            fontWeight: 'bold',
            fontSize: '1rem',
            px: 3,
            mr: 3,
            boxShadow: '0 2px 8px rgba(255,107,107,0.15)',
          }}
          onClick={() => navigate('/admin/user-login')}
        >
          Logout
        </Button>
      </Box>
      <Box sx={{ mb: 3, textAlign: 'center', position: 'relative' }}>
        {/* Back Button */}
        {previousPage && (
          <IconButton 
            onClick={handleBackClick}
            sx={{ 
              position: 'absolute', 
              left: 0, 
              top: 0,
              color: 'primary.main',
              backgroundColor: 'rgba(25, 118, 210, 0.1)',
              '&:hover': {
                backgroundColor: 'rgba(25, 118, 210, 0.2)',
              }
            }}
            title="Go back to previous page"
          >
            <ArrowBackIcon />
          </IconButton>
        )}
        <Typography variant="body1">Explore and discover India's incredible heritage</Typography>
      </Box>
      <Tabs
        value={tab}
        onChange={handleTabChange}
        centered
        sx={{ mb: 2,
          '& .MuiTab-root': {
            fontWeight: 600,
            borderRadius: 2,
            mx: 0.5,
            color: '#fff',
            background: '#1976d2',
            transition: 'background 0.3s',
          },
          '& .Mui-selected': {
            background: '#43cea2',
            color: '#fff',
            boxShadow: '0 2px 10px rgba(67,206,162,0.2)',
          },
        }}
      >
        <Tab label="Dashboard" />
        <Tab label="My Journey" />
        <Tab label="Favorites" />
        <Tab label="Recommendations" />
        <Tab label="Learning" />
        <Tab label="Profile" />
      </Tabs>
      {tab === 0 && (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Your Heritage Journey</Typography>
          <Grid container spacing={2} sx={{ maxWidth: '800px', justifyContent: 'center' }}>
            {userProgress.map((item, idx) => (
              <Grid item xs={12} md={4} key={idx}>
                <Card sx={{ textAlign: 'center', p: 2 }}>
                  <Typography variant="h4" color="primary">{item.count}</Typography>
                  <Typography variant="body2">{item.activity}</Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>Quick Actions</Typography>
          <Stack direction="row" spacing={3} flexWrap="wrap" sx={{ justifyContent: 'center' }}>
            <Button 
              component={Link} 
              to="/culture" 
              variant="contained"
              sx={{
                background: '#ff6b6b',
                color: '#fff',
                padding: '12px 24px',
                borderRadius: '25px',
                fontWeight: 'bold',
                fontSize: '0.9rem',
                textTransform: 'none',
                boxShadow: '0 4px 20px rgba(255, 107, 107, 0.3)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  background: '#f9d423',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 25px rgba(255, 107, 107, 0.5)',
                }
              }}
            >
               Explore Culture
            </Button>
            <Button 
              component={Link} 
              to="/heritage" 
              variant="contained"
              sx={{
                background: '#43cea2',
                color: '#fff',
                padding: '12px 24px',
                borderRadius: '25px',
                fontWeight: 'bold',
                fontSize: '0.9rem',
                textTransform: 'none',
                boxShadow: '0 4px 20px rgba(67,206,162,0.3)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  background: '#185a9d',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 25px rgba(67,206,162,0.5)',
                }
              }}
            >
               Visit Heritage Sites
            </Button>
            <Button 
              component={Link} 
              to="/monuments" 
              variant="contained"
              sx={{
                background: '#a6c1ee',
                color: '#fff',
                padding: '12px 24px',
                borderRadius: '25px',
                fontWeight: 'bold',
                fontSize: '0.9rem',
                textTransform: 'none',
                boxShadow: '0 4px 20px rgba(171,193,238,0.3)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  background: '#fbc2eb',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 25px rgba(171,193,238,0.5)',
                }
              }}
            >
               Discover Monuments
            </Button>
          </Stack>
        </Box>
      )}
      {tab === 1 && (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', width: '100%' }}>
          <Typography variant="h6" sx={{ mb: 2 }}>My Heritage Journey</Typography>
          <Typography variant="body1" sx={{ mb: 3, maxWidth: '600px' }}>Track your visits, experiences, and cultural discoveries here.</Typography>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>Sites Visited:</Typography>
          {visitedSites.length === 0 ? (
            <Typography variant="body2" sx={{ mb: 2 }}>No sites visited yet.</Typography>
          ) : (
            <ul style={{ listStyle: 'none', padding: 0, marginBottom: 16 }}>
              {visitedSites.map(site => (
                <li key={site.id} style={{ marginBottom: 4 }}>
                  <span role="img" aria-label="location">📍</span> {site.name} <span style={{ color: '#888', fontSize: '0.9em' }}>({site.location})</span>
                </li>
              ))}
            </ul>
          )}
          <Button variant="contained" sx={{ mt: 2 }} onClick={() => setShowSitesDialog(true)}>Add New Visit</Button>
          <Dialog open={showSitesDialog} onClose={() => setShowSitesDialog(false)} maxWidth="sm" fullWidth>
            <DialogTitle>Select a Site to Add</DialogTitle>
            <DialogContent>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {monumentData.filter(site => !visitedSites.some(v => v.id === site.id)).map(site => (
                  <li key={site.id} style={{ marginBottom: 8 }}>
                    <Button
                      variant="outlined"
                      fullWidth
                      sx={{ justifyContent: 'flex-start', textTransform: 'none', mb: 1 }}
                      onClick={() => {
                        setVisitedSites(prev => [...prev, site]);
                        setShowSitesDialog(false);
                      }}
                    >
                      <span role="img" aria-label="location">📍</span> {site.name} <span style={{ color: '#888', fontSize: '0.9em' }}>({site.location})</span>
                    </Button>
                  </li>
                ))}
                {monumentData.filter(site => !visitedSites.some(v => v.id === site.id)).length === 0 && (
                  <Typography variant="body2" sx={{ mt: 2 }}>All sites have been added to your journey!</Typography>
                )}
              </ul>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setShowSitesDialog(false)}>Close</Button>
            </DialogActions>
          </Dialog>
        </Box>
      )}
      {tab === 2 && (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <Typography variant="h6" sx={{ mb: 2 }}>My Favorites</Typography>
          <Grid container spacing={2} sx={{ maxWidth: '800px', justifyContent: 'center' }}>
            {userFavorites.map((item, idx) => (
              <Grid item xs={12} md={4} key={idx}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{item.name}</Typography>
                    <Chip 
                      label={item.type} 
                      color="primary" 
                      size="small" 
                      sx={{ mt: 1, mr: 1 }} 
                    />
                    {item.visited && (
                      <Chip 
                        label="Visited" 
                        color="success" 
                        size="small" 
                        sx={{ mt: 1 }} 
                      />
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
      {tab === 3 && (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Recommendations for You</Typography>
          <Grid container spacing={2} sx={{ maxWidth: '800px', justifyContent: 'center' }}>
            {userRecommendations.map((item, idx) => (
              <Grid item xs={12} md={4} key={idx}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{item.name}</Typography>
                    <Chip label={item.type} color="secondary" size="small" sx={{ mt: 1 }} />
                    <Button variant="outlined" size="small" sx={{ mt: 2, display: 'block' }}>
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
      {tab === 4 && (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Learning Center</Typography>
          <Typography variant="body1" sx={{ mb: 3, maxWidth: '600px' }}>Access educational content, quizzes, and interactive modules about Indian heritage.</Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>Quiz Attempts: {quizAttempts} | Last Score: {quizScore}/{quizQuestions.length || 3}</Typography>
          <Button
            variant="contained"
            sx={{ mt: 2 }}
            onClick={() => {
              // Shuffle and pick 3 random questions for each quiz
              const shuffled = shuffleArray(allQuizQuestions).slice(0, 3);
              setQuizQuestions(shuffled);
              setQuizOpen(true);
              setQuizStep(0);
              setQuizAnswers([]);
              setQuizFinished(false);
            }}
          >Start Quiz</Button>
          <Dialog open={quizOpen} onClose={() => setQuizOpen(false)} maxWidth="sm" fullWidth>
            <DialogTitle>Heritage Quiz</DialogTitle>
            <DialogContent>
              {!quizFinished && quizQuestions.length > 0 ? (
                <>
                  <Typography variant="subtitle1" sx={{ mb: 2 }}>{quizQuestions[quizStep].question}</Typography>
                  <RadioGroup
                    value={quizAnswers[quizStep] || ''}
                    onChange={e => {
                      const newAnswers = [...quizAnswers];
                      newAnswers[quizStep] = e.target.value;
                      setQuizAnswers(newAnswers);
                    }}
                  >
                    {quizQuestions[quizStep].options.map(opt => (
                      <FormControlLabel key={opt} value={opt} control={<Radio />} label={opt} />
                    ))}
                  </RadioGroup>
                </>
              ) : quizFinished ? (
                <Box sx={{ textAlign: 'center', py: 2 }}>
                  <Typography variant="h6">Quiz Complete!</Typography>
                  <Typography variant="body1" sx={{ mt: 1 }}>Your Score: {quizScore} / {quizQuestions.length}</Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>Attempts: {quizAttempts}</Typography>
                </Box>
              ) : null}
            </DialogContent>
            <DialogActions>
              {!quizFinished && quizStep > 0 && (
                <Button onClick={() => setQuizStep(quizStep - 1)}>Back</Button>
              )}
              {!quizFinished && quizQuestions.length > 0 && quizStep < quizQuestions.length - 1 && (
                <Button
                  onClick={() => setQuizStep(quizStep + 1)}
                  disabled={!quizAnswers[quizStep]}
                >
                  Next
                </Button>
              )}
              {!quizFinished && quizQuestions.length > 0 && quizStep === quizQuestions.length - 1 && (
                <Button
                  onClick={() => {
                    // Calculate score
                    let score = 0;
                    quizQuestions.forEach((q, idx) => {
                      if (quizAnswers[idx] === q.answer) score++;
                    });
                    setQuizScore(score);
                    setQuizAttempts(a => a + 1);
                    incrementLearningModulesCompleted();
                    setQuizFinished(true);
                  }}
                  disabled={!quizAnswers[quizStep]}
                >
                  Finish
                </Button>
              )}
              <Button onClick={() => setQuizOpen(false)}>Close</Button>
            </DialogActions>
          </Dialog>
        </Box>
      )}
      {tab === 5 && (
        (() => {
          const userProfile = {
            userId: "U12345",
            username: "heritageFan99",
            fullName: "Rahul Sharma",
            email: "rahul.sharma@example.com",
            profilePicture: "https://example.com/profiles/rahul.jpg",
            passwordHash: "hashed_password_here",
            role: "Cultural Enthusiast",
            location: "Delhi, India",
            languagePreference: "English",
            commonSettings: {
              privacy: {
                profileVisibility: "public",
                showActivityStatus: true
              },
              notifications: {
                email: true,
                push: true,
                inApp: true
              },
              linkedAccounts: {
                google: true,
                facebook: false
              }
            },
            roleSpecific: {
              admin: {
                permissions: ["manageUsers", "moderateContent", "approveTours"],
                activityLogs: [
                  { action: "Deleted inappropriate comment", date: "2025-09-30" }
                ]
              },
              culturalEnthusiast: {
                interests: ["Monuments", "Festivals", "Traditional Art"],
                favorites: ["Taj Mahal", "Konark Sun Temple"],
                completedTours: [
                  { tourId: "T001", name: "Ajanta Caves", date: "2025-08-12" }
                ],
                badges: ["Explorer", "Festival Lover"]
              },
              contentCreator: {
                contributions: [
                  { contentId: "C101", title: "History of Hampi", status: "Published" },
                  { contentId: "C102", title: "Diwali Traditions", status: "Draft" }
                ],
                feedbackReceived: [
                  { fromUser: "U567", rating: 4.5, comment: "Very informative!" }
                ]
              },
              tourGuide: {
                assignedTours: ["T001", "T002"],
                availability: {
                  monday: "10:00 - 14:00",
                  friday: "16:00 - 19:00"
                },
                ratings: [
                  { fromUser: "U890", score: 5, comment: "Great explanations!" }
                ]
              }
            },
            activity: {
              lastLogin: "2025-09-29T14:22:00Z",
              recentActions: ["Joined Taj Mahal Tour", "Commented on Hampi Article"],
              engagementScore: 87
            }
          };
          return (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', maxWidth: 500, mx: 'auto', mt: 2, p: 3, background: '#fff', borderRadius: 3, boxShadow: 2 }}>
              <Avatar src={userProfile.profilePicture} sx={{ width: 72, height: 72, bgcolor: '#1976d2', mb: 2 }} />
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>{userProfile.fullName}</Typography>
              <Typography variant="body2" sx={{ color: '#555', mb: 1 }}>@{userProfile.username}</Typography>
              <Typography variant="body2" sx={{ color: '#555', mb: 1 }}>{userProfile.email}</Typography>
              <Typography variant="body2" sx={{ color: '#555', mb: 1 }}>{userProfile.location}</Typography>
              <Typography variant="body2" sx={{ color: '#555', mb: 1 }}>Language: {userProfile.languagePreference}</Typography>
              <Box sx={{ mt: 2, textAlign: 'left', width: '100%' }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>Privacy</Typography>
                <Typography variant="body2">Profile Visibility: {userProfile.commonSettings.privacy.profileVisibility}</Typography>
                <Typography variant="body2">Show Activity Status: {userProfile.commonSettings.privacy.showActivityStatus ? 'Yes' : 'No'}</Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mt: 2, mb: 1 }}>Notifications</Typography>
                <Typography variant="body2">Email: {userProfile.commonSettings.notifications.email ? 'On' : 'Off'}, Push: {userProfile.commonSettings.notifications.push ? 'On' : 'Off'}, In-App: {userProfile.commonSettings.notifications.inApp ? 'On' : 'Off'}</Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mt: 2, mb: 1 }}>Linked Accounts</Typography>
                <Typography variant="body2">Google: {userProfile.commonSettings.linkedAccounts.google ? 'Linked' : 'Not Linked'}, Facebook: {userProfile.commonSettings.linkedAccounts.facebook ? 'Linked' : 'Not Linked'}</Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mt: 2, mb: 1 }}>Role: {userProfile.role}</Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mt: 2, mb: 1 }}>Interests</Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                  {userProfile.roleSpecific.culturalEnthusiast.interests.map((interest, i) => (
                    <Button key={i} variant="outlined" color="primary" size="small" sx={{ borderRadius: 2 }}>{interest}</Button>
                  ))}
                </Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>Favorites</Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                  {userProfile.roleSpecific.culturalEnthusiast.favorites.map((fav, i) => (
                    <Button key={i} variant="contained" color="secondary" size="small" sx={{ borderRadius: 2 }}>{fav}</Button>
                  ))}
                </Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>Completed Tours</Typography>
                <Box sx={{ mb: 2 }}>
                  {userProfile.roleSpecific.culturalEnthusiast.completedTours.map((tour, i) => (
                    <Typography key={i} variant="body2">{tour.name} <span style={{ color: '#888', fontSize: '0.9em' }}>({tour.date})</span></Typography>
                  ))}
                </Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>Badges</Typography>
                <Box sx={{ mb: 2 }}>
                  {userProfile.roleSpecific.culturalEnthusiast.badges.map((badge, i) => (
                    <Chip key={i} label={badge} color="success" sx={{ mr: 1 }} />
                  ))}
                </Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>Recent Activity</Typography>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2">Last Login: {new Date(userProfile.activity.lastLogin).toLocaleString()}</Typography>
                  <Typography variant="body2">Engagement Score: {userProfile.activity.engagementScore}</Typography>
                  <Typography variant="body2">Recent Actions: {userProfile.activity.recentActions.join(', ')}</Typography>
                </Box>
              </Box>
            </Box>
          );
        })()
      )}
    </div>
  );
}

export default UserDashboard;