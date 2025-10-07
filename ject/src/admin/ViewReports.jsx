import React from 'react';
import './Admin.css';

const ViewReports = () => {
  // Example analytics data
  const analytics = {
    mostVisitedMonuments: [
      { name: 'Taj Mahal', visits: 120 },
      { name: 'Red Fort', visits: 95 },
      { name: 'Qutub Minar', visits: 80 }
    ],
    popularTours: [
      { name: 'Delhi Heritage Walk', bookings: 45 },
      { name: 'Agra Monuments Tour', bookings: 38 }
    ],
    activeDiscussions: [
      { topic: 'Preservation Techniques', posts: 12 },
      { topic: 'Cultural Festivals', posts: 9 }
    ],
    visitorStats: {
      totalVisitors: 350,
      userGrowth: '15% this month',
      contentInteractions: 210
    }
  };

  // Export analytics as JSON
  const handleExport = () => {
    const dataStr = JSON.stringify(analytics, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'analytics-report.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="view-reports-container">
      <h1>Reports & Analytics</h1>
      <p className="reports-subtitle">View reports on user engagement, visitor stats, and export analytics.</p>

      <div className="reports-section">
        <h2>Most Visited Monuments</h2>
        <ul className="reports-list">
          {analytics.mostVisitedMonuments.map(m => (
            <li key={m.name}>{m.name}: {m.visits} visits</li>
          ))}
        </ul>
      </div>

      <div className="reports-section">
        <h2>Popular Tours</h2>
        <ul className="reports-list">
          {analytics.popularTours.map(t => (
            <li key={t.name}>{t.name}: {t.bookings} bookings</li>
          ))}
        </ul>
      </div>

      <div className="reports-section">
        <h2>Active Discussions</h2>
        <ul className="reports-list">
          {analytics.activeDiscussions.map(d => (
            <li key={d.topic}>{d.topic}: {d.posts} posts</li>
          ))}
        </ul>
      </div>

      <div className="reports-section">
        <h2>Visitor & Growth Stats</h2>
        <ul className="reports-list">
          <li>Total Visitors: {analytics.visitorStats.totalVisitors}</li>
          <li>User Growth: {analytics.visitorStats.userGrowth}</li>
          <li>Content Interactions: {analytics.visitorStats.contentInteractions}</li>
        </ul>
      </div>

      <button className="action-btn primary" onClick={handleExport} style={{marginTop:24}}>
        Export Analytics
      </button>
    </div>
  );
};

export default ViewReports;
