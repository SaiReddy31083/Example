import React, { useState, useEffect } from 'react';
import { Button, Card, CardContent, Typography, Grid, Box, Tabs, Tab, Chip, Stack } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import ArticleEditor from './ArticleEditor';
import ArticlePreview from './ArticlePreview';
import './Admin.css';
import './ContentCreatorDashboard.css';


// Default projects used for initial stats and initial content
const defaultProjects = [
  { title: 'Taj Mahal', type: 'Article', status: 'Published', body: 'A famous monument in India.', images: [] },
  { title: 'Diwali Festival', type: 'Video', status: 'Draft', video: null, videoDesc: 'Festival of lights.' },
  { title: 'Holi Gallery', type: 'Photography', status: 'Published', images: [], galleryDesc: 'Colors of Holi.' }
];

function getInitialProjects() {
  // Example default projects
  return [...defaultProjects];
}

function getInitialStats() {
  const data = localStorage.getItem('creatorStats');
  if (data) return JSON.parse(data);
  // Default stats based on defaultProjects
  return {
    articles: defaultProjects.filter(p => p.type === 'Article').length,
    videos: defaultProjects.filter(p => p.type === 'Video').length,
    galleries: defaultProjects.filter(p => p.type === 'Photography').length,
    views: 15200
  };
}

const contentIdeas = [
  { title: 'Rajasthani Folk Art', category: 'Traditional Arts' },
  { title: 'Goa\'s Portuguese Heritage', category: 'Colonial History' },
  { title: 'Himalayan Monasteries', category: 'Spiritual Sites' },
];

function ContentCreatorDashboard() {
  const [deleteIdx, setDeleteIdx] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [tab, setTab] = useState(0);
  const [projects, setProjects] = useState(getInitialProjects());
  const [stats, setStats] = useState(getInitialStats());
  const [newContent, setNewContent] = useState({ type: '', title: '', status: 'Draft', video: null, videoDesc: '', images: [], galleryDesc: '' });
  const [createError, setCreateError] = useState('');
  const [videoUploadOpen, setVideoUploadOpen] = useState(false);
  const [galleryUploadOpen, setGalleryUploadOpen] = useState(false);
  const [editorOpen, setEditorOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('creatorProjects', JSON.stringify(projects));
    // Update stats
    const articles = projects.filter(p => p.type === 'Article').length;
    const videos = projects.filter(p => p.type === 'Video').length;
    const galleries = projects.filter(p => p.type === 'Photography').length;
    setStats(s => {
      const updated = { ...s, articles, videos, galleries };
      localStorage.setItem('creatorStats', JSON.stringify(updated));
      return updated;
    });
  }, [projects]);

  const handleTabChange = (e, newValue) => setTab(newValue);

  const handleCreateContent = (type) => {
    setNewContent({ type, title: '', status: 'Draft' });
    setTab(2); // Go to Create New tab
  };

  const handleContentInput = (e) => {
    setNewContent({ ...newContent, title: e.target.value });
    setCreateError('');
  };

  const handleSaveContent = () => {
    if (!newContent.title.trim()) {
      setCreateError('Title is required.');
      return;
    }
    setProjects(prev => [
      { ...newContent, status: 'Draft' },
      ...prev
    ]);
    setNewContent({ type: '', title: '', status: 'Draft' });
    setCreateError('');
    setTab(1); // Go to My Content
  };

  // Add keyframes for gradient animation
  React.useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes gradientMove {
        0% {background-position:0% 50%}
        50% {background-position:100% 50%}
        100% {background-position:0% 50%}
      }
    `;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);

  // Add keyframes for logout button gradient animation
  React.useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes logoutGradient {
        0% {background-position:0% 50%;}
        50% {background-position:100% 50%;}
        100% {background-position:0% 50%;}
      }
    `;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);

  return (
    <div
      className="content-creator-dashboard custom-dashboard-bg"
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(270deg, #f5f7fa, #c3cfe2, #e0c3fc, #8ec5fc, #f093fb, #f5576c)',
        backgroundSize: '1200% 1200%',
        animation: 'gradientMove 18s ease infinite'
      }}
    >
      <Box className="dashboard-header" sx={{ mb: 3, textAlign: 'center' }}>
        <Typography variant="h4" className="dashboard-title">Content Creator Studio 🎨</Typography>
        <Typography variant="body1" className="dashboard-subtitle">Create and share amazing heritage content</Typography>
      </Box>
      {/* Navbar */}
      <nav className="dashboard-navbar" style={{ background: '#fff', boxShadow: '0 2px 8px rgba(102,126,234,0.07)', padding: '0.5rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <Button 
            color={tab === 0 ? "secondary" : "primary"}
            variant={tab === 0 ? "contained" : "text"}
            onClick={() => { setTab(0); navigate('/admin/content-creator-dashboard'); }} 
            sx={{ fontWeight: 600 }}
          >Dashboard</Button>
          <Button 
            color={tab === 1 ? "secondary" : "primary"}
            variant={tab === 1 ? "contained" : "text"}
            onClick={() => setTab(1)} 
            sx={{ fontWeight: 600 }}
          >My Content</Button>
          <Button 
            color={tab === 2 ? "secondary" : "primary"}
            variant={tab === 2 ? "contained" : "text"}
            onClick={() => setTab(2)} 
            sx={{ fontWeight: 600 }}
          >Create New</Button>
          <Button 
            color={tab === 3 ? "secondary" : "primary"}
            variant={tab === 3 ? "contained" : "text"}
            onClick={() => setTab(3)} 
            sx={{ fontWeight: 600 }}
          >Analytics</Button>
          <Button 
            color={tab === 4 ? "secondary" : "primary"}
            variant={tab === 4 ? "contained" : "text"}
            onClick={() => setTab(4)} 
            sx={{ fontWeight: 600 }}
          >Resources</Button>
          <Button 
            color={tab === 5 ? "secondary" : "primary"}
            variant={tab === 5 ? "contained" : "text"}
            onClick={() => setTab(5)} 
            sx={{ fontWeight: 600 }}
          >Settings</Button>
        </div>
        <div>
          <Button
            variant="contained"
            color="error"
            sx={{
              fontWeight: 600,
              color: '#fff',
              border: 'none',
            }}
            onClick={() => navigate('/')}
          >
            Logout
          </Button>
        </div>
      </nav>
    
      <Box className="dashboard-content">
        {tab === 0 && (
          <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>Content Overview</Typography>
            <Grid container spacing={3} className="dashboard-stats">
              <Grid item xs={12} md={3}><Card className="stat-card"><Typography variant="h4" color="primary">{stats.articles}</Typography><Typography variant="body2">Articles Published</Typography></Card></Grid>
              <Grid item xs={12} md={3}><Card className="stat-card"><Typography variant="h4" color="primary">{stats.videos}</Typography><Typography variant="body2">Videos Created</Typography></Card></Grid>
              <Grid item xs={12} md={3}><Card className="stat-card"><Typography variant="h4" color="primary">{stats.galleries}</Typography><Typography variant="body2">Galleries Created</Typography></Card></Grid>
              <Grid item xs={12} md={3}><Card className="stat-card"><Typography variant="h4" color="primary">{stats.views}</Typography><Typography variant="body2">Total Views</Typography></Card></Grid>
            </Grid>
            <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>Recent Projects</Typography>
            <Grid container spacing={2}>
              {projects.slice(0, 3).map((project, idx) => (
                <Grid item xs={12} md={4} key={idx}>
                  <Card className="project-card">
                    <CardContent>
                      <Typography variant="h6">{project.title}</Typography>
                      <Chip label={project.type} color="primary" size="small" sx={{ mt: 1, mr: 1 }} />
                      <Chip label={project.status} color={project.status === 'Published' ? 'success' : 'warning'} size="small" sx={{ mt: 1 }} />
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
        {tab === 1 && (
          <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>My Content Library</Typography>
            <Grid container spacing={2}>
              {projects.map((project, idx) => (
                <Grid item xs={12} md={6} key={idx}>
                  <Card className="project-card">
                    <CardContent>
                      <Typography variant="h6">{project.title}</Typography>
                      <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                        <Chip label={project.type} color="primary" size="small" />
                        <Chip label={project.status} color={project.status === 'Published' ? 'success' : 'warning'} size="small" />
                      </Stack>
                      <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                        {project.type === 'Article' && (
                          <Button variant="outlined" size="small" onClick={() => {
                            setSelectedArticle(project);
                            setEditorOpen(true);
                          }}>Edit</Button>
                        )}
                        {project.type === 'Article' && (
                          <Button variant="outlined" size="small" onClick={() => {
                            setSelectedArticle(project);
                            setPreviewOpen(true);
                          }}>Preview</Button>
                        )}
                        <Button variant="outlined" size="small" onClick={() => window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent(project.title), '_blank')}>Share</Button>
                        <Button variant="outlined" color="error" size="small" onClick={() => {
                          setDeleteIdx(idx);
                          setShowDeleteDialog(true);
                        }}>Delete</Button>
            {/* Delete Confirmation Dialog */}
            {showDeleteDialog && deleteIdx === idx && (
              <Box sx={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', bgcolor: 'rgba(0,0,0,0.25)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Box sx={{ background: '#fff', p: 4, borderRadius: 2, boxShadow: 4, minWidth: 320, textAlign: 'center' }}>
                  <Typography variant="h6" sx={{ mb: 2 }}>Are you sure you want to delete "{project.title}"?</Typography>
                  <Button variant="contained" color="error" sx={{ mr: 2 }} onClick={() => {
                    setProjects(projects.filter((_, i) => i !== deleteIdx));
                    setShowDeleteDialog(false);
                    setDeleteIdx(null);
                  }}>Delete</Button>
                  <Button variant="outlined" color="primary" onClick={() => {
                    setShowDeleteDialog(false);
                    setDeleteIdx(null);
                  }}>Cancel</Button>
                </Box>
              </Box>
            )}
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
            {/* Article Editor Modal/Page */}
            {editorOpen && (
              <ArticleEditor
                article={selectedArticle}
                onSave={updated => {
                  setProjects(projects.map(p => p === selectedArticle ? updated : p));
                  setEditorOpen(false);
                  setSelectedArticle(null);
                }}
                onCancel={() => {
                  setEditorOpen(false);
                  setSelectedArticle(null);
                }}
              />
            )}
            {/* Article Preview Modal/Page */}
            {previewOpen && (
              <ArticlePreview
                article={selectedArticle}
              />
            )}
            {previewOpen && (
              <Button sx={{ mt: 2 }} variant="outlined" color="secondary" onClick={() => setPreviewOpen(false)}>Close Preview</Button>
            )}
          </Box>
        )}
        {tab === 2 && (
          <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>Create New Content</Typography>
            {/* Only show the selection cards if no form is open */}
            {!editorOpen && !videoUploadOpen && !galleryUploadOpen && (
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <Card className="create-card" sx={{ textAlign: 'center', p: 3 }}>
                    <Typography variant="h5">📝</Typography>
                    <Typography variant="h6">Article</Typography>
                    <Typography variant="body2">Write about heritage sites, traditions, and culture</Typography>
                    <Button variant="contained" sx={{ mt: 2 }} onClick={() => {
                      setSelectedArticle({ type: 'Article', title: '', body: '', images: [], status: 'Draft' });
                      setEditorOpen(true);
                    }}>Create Article</Button>
                  </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Card className="create-card" sx={{ textAlign: 'center', p: 3 }}>
                    <Typography variant="h5">🎥</Typography>
                    <Typography variant="h6">Video</Typography>
                    <Typography variant="body2">Create documentaries and visual stories</Typography>
                    <Button variant="contained" sx={{ mt: 2 }} onClick={() => {
                      setNewContent({ type: 'Video', title: '', status: 'Draft', video: null, videoDesc: '' });
                      setVideoUploadOpen(true);
                    }}>Create Video</Button>
                  </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Card className="create-card" sx={{ textAlign: 'center', p: 3 }}>
                    <Typography variant="h5">📸</Typography>
                    <Typography variant="h6">Photo Gallery</Typography>
                    <Typography variant="body2">Showcase heritage through photography</Typography>
                    <Button variant="contained" sx={{ mt: 2 }} onClick={() => {
                      setNewContent({ type: 'Photography', title: '', status: 'Draft', images: [], galleryDesc: '' });
                      setGalleryUploadOpen(true);
                    }}>Create Gallery</Button>
                  </Card>
                </Grid>
              </Grid>
            )}
            {/* Article Editor for New Article */}
            {editorOpen && selectedArticle?.type === 'Article' && (
              <ArticleEditor
                article={selectedArticle}
                onSave={updated => {
                  setProjects([updated, ...projects]);
                  setEditorOpen(false);
                  setSelectedArticle(null);
                  setTab(1);
                }}
                onCancel={() => {
                  setEditorOpen(false);
                  setSelectedArticle(null);
                }}
              />
            )}
            {/* Video Upload Modal/Page */}
            {videoUploadOpen && (
              <Box className="create-form" sx={{ mt: 4, maxWidth: 400, mx: 'auto', textAlign: 'center', background: '#fff', p: 3, borderRadius: 2, boxShadow: 2 }}>
                <Typography variant="subtitle1">Upload Video</Typography>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Enter Video Title"
                  value={newContent.title}
                  onChange={e => setNewContent({ ...newContent, title: e.target.value })}
                  style={{ marginBottom: '10px', width: '100%' }}
                />
                <input
                  type="file"
                  accept="video/*"
                  onChange={e => setNewContent({ ...newContent, video: e.target.files[0] })}
                  style={{ marginBottom: '10px', width: '100%' }}
                />
                <textarea
                  className="form-input"
                  placeholder="Enter Video Description"
                  value={newContent.videoDesc}
                  onChange={e => setNewContent({ ...newContent, videoDesc: e.target.value })}
                  style={{ marginBottom: '10px', width: '100%' }}
                />
                <Button variant="contained" onClick={() => {
                  setProjects([{ ...newContent }, ...projects]);
                  setVideoUploadOpen(false);
                  setTab(1);
                }} sx={{ mt: 1 }}>Save Video</Button>
                <Button variant="outlined" color="secondary" onClick={() => setVideoUploadOpen(false)} sx={{ mt: 1, ml: 2 }}>Cancel</Button>
              </Box>
            )}
            {/* Photo Gallery Upload Modal/Page */}
            {galleryUploadOpen && (
              <Box className="create-form" sx={{ mt: 4, maxWidth: 400, mx: 'auto', textAlign: 'center', background: '#fff', p: 3, borderRadius: 2, boxShadow: 2 }}>
                <Typography variant="subtitle1">Upload Photo Gallery</Typography>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Enter Gallery Title"
                  value={newContent.title}
                  onChange={e => setNewContent({ ...newContent, title: e.target.value })}
                  style={{ marginBottom: '10px', width: '100%' }}
                />
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={e => setNewContent({ ...newContent, images: Array.from(e.target.files) })}
                  style={{ marginBottom: '10px', width: '100%' }}
                />
                <textarea
                  className="form-input"
                  placeholder="Enter Gallery Description"
                  value={newContent.galleryDesc}
                  onChange={e => setNewContent({ ...newContent, galleryDesc: e.target.value })}
                  style={{ marginBottom: '10px', width: '100%' }}
                />
                <Button variant="contained" onClick={() => {
                  setProjects([{ ...newContent }, ...projects]);
                  setGalleryUploadOpen(false);
                  setTab(1);
                }} sx={{ mt: 1 }}>Save Gallery</Button>
                <Button variant="outlined" color="secondary" onClick={() => setGalleryUploadOpen(false)} sx={{ mt: 1, ml: 2 }}>Cancel</Button>
              </Box>
            )}
          </Box>
        )}
        {tab === 3 && (
          <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>Content Analytics</Typography>
            <Typography variant="body1">View detailed analytics about your content performance.</Typography>
            <Button variant="contained" sx={{ mt: 2 }} onClick={() => navigate('/admin/content-creator-dashboard/analytics')}>View Full Analytics</Button>
          </Box>
        )}
        {tab === 4 && (
          <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>Content Ideas & Resources</Typography>
            <Typography variant="subtitle1" sx={{ mb: 2 }}>Trending Topics</Typography>
            <Grid container spacing={2}>
              {contentIdeas.map((idea, idx) => (
                <Grid item xs={12} md={4} key={idx}>
                  <Card className="project-card">
                    <CardContent>
                      <Typography variant="h6">{idea.title}</Typography>
                      <Chip label={idea.category} color="secondary" size="small" sx={{ mt: 1 }} />
                      <Button variant="outlined" size="small" sx={{ mt: 2, display: 'block' }} onClick={() => setTab(2)}>
                        Use This Idea
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
        {tab === 5 && (
          <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>Creator Settings</Typography>
            <Typography variant="body1">Manage your creator profile and content preferences.</Typography>
            <Button variant="contained" sx={{ mt: 2 }} onClick={() => navigate('/admin/content-creator-dashboard/settings')}>Go to Settings</Button>
          </Box>
        )}
      </Box>
    </div>
  );
}

export default ContentCreatorDashboard;