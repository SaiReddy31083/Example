import React, { useState } from 'react';
import { culturalData, monumentData, heritageSites } from '../database/data.js';
import './Admin.css';

const ManageData = () => {
  const [activeTab, setActiveTab] = useState('cultural');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    type: '',
    significance: '',
    region: '',
    season: '',
    built: '',
    builder: '',
    architecture: '',
    visitingHours: '',
    entryFee: '',
    period: ''
  });

  const [editingId, setEditingId] = useState(null);

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      location: '',
      type: '',
      significance: '',
      region: '',
      season: '',
      built: '',
      builder: '',
      architecture: '',
      visitingHours: '',
      entryFee: '',
      period: ''
    });
    setEditingId(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingId) {
      // In a real app, this would update the data in the database
      alert(`Updated ${formData.name} successfully!`);
    } else {
      // In a real app, this would add new data to the database
      alert(`Added ${formData.name} successfully!`);
    }
    
    resetForm();
  };

  const handleEdit = (item) => {
    setFormData(item);
    setEditingId(item.id);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      // In a real app, this would delete from the database
      alert(`Deleted "${name}" successfully!`);
    }
  };

  const renderCulturalForm = () => (
    <form onSubmit={handleSubmit} className="manage-form">
      <h3>{editingId ? 'Edit Cultural Data' : 'Add New Cultural Data'}</h3>
      
      <div className="form-row">
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            placeholder="e.g., Diwali"
          />
        </div>
        
        <div className="form-group">
          <label>Type:</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Type</option>
            <option value="Festival">Festival</option>
            <option value="Tradition">Tradition</option>
            <option value="Art Form">Art Form</option>
            <option value="Cuisine">Cuisine</option>
          </select>
        </div>
      </div>
      
      <div className="form-group">
        <label>Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          required
          rows="4"
          placeholder="Detailed description..."
        />
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label>Region:</label>
          <input
            type="text"
            name="region"
            value={formData.region}
            onChange={handleInputChange}
            placeholder="e.g., Pan-India"
          />
        </div>
        
        <div className="form-group">
          <label>Season:</label>
          <input
            type="text"
            name="season"
            value={formData.season}
            onChange={handleInputChange}
            placeholder="e.g., October-November"
          />
        </div>
      </div>
      
      <div className="form-group">
        <label>Significance:</label>
        <input
          type="text"
          name="significance"
          value={formData.significance}
          onChange={handleInputChange}
          placeholder="Cultural significance..."
        />
      </div>
      
      <div className="form-actions">
        <button type="submit" className="submit-btn">
          {editingId ? 'Update' : 'Add'} Cultural Data
        </button>
        <button type="button" onClick={resetForm} className="cancel-btn">
          Cancel
        </button>
      </div>
    </form>
  );

  const renderMonumentForm = () => (
    <form onSubmit={handleSubmit} className="manage-form">
      <h3>{editingId ? 'Edit Monument Data' : 'Add New Monument Data'}</h3>
      
      <div className="form-row">
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            placeholder="e.g., Taj Mahal"
          />
        </div>
        
        <div className="form-group">
          <label>Location:</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            required
            placeholder="e.g., Agra, Uttar Pradesh"
          />
        </div>
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label>Built:</label>
          <input
            type="text"
            name="built"
            value={formData.built}
            onChange={handleInputChange}
            placeholder="e.g., 1632-1653"
          />
        </div>
        
        <div className="form-group">
          <label>Builder:</label>
          <input
            type="text"
            name="builder"
            value={formData.builder}
            onChange={handleInputChange}
            placeholder="e.g., Shah Jahan"
          />
        </div>
      </div>
      
      <div className="form-group">
        <label>Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          required
          rows="4"
          placeholder="Detailed description..."
        />
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label>Type:</label>
          <input
            type="text"
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            placeholder="e.g., Mausoleum"
          />
        </div>
        
        <div className="form-group">
          <label>Architecture:</label>
          <input
            type="text"
            name="architecture"
            value={formData.architecture}
            onChange={handleInputChange}
            placeholder="e.g., Indo-Islamic architecture"
          />
        </div>
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label>Visiting Hours:</label>
          <input
            type="text"
            name="visitingHours"
            value={formData.visitingHours}
            onChange={handleInputChange}
            placeholder="e.g., 6:00 AM to 7:00 PM"
          />
        </div>
        
        <div className="form-group">
          <label>Entry Fee:</label>
          <input
            type="text"
            name="entryFee"
            value={formData.entryFee}
            onChange={handleInputChange}
            placeholder="e.g., ₹50 for Indians"
          />
        </div>
      </div>
      
      <div className="form-group">
        <label>Significance:</label>
        <input
          type="text"
          name="significance"
          value={formData.significance}
          onChange={handleInputChange}
          placeholder="Historical significance..."
        />
      </div>
      
      <div className="form-actions">
        <button type="submit" className="submit-btn">
          {editingId ? 'Update' : 'Add'} Monument Data
        </button>
        <button type="button" onClick={resetForm} className="cancel-btn">
          Cancel
        </button>
      </div>
    </form>
  );

  const renderDataList = (data, type) => (
    <div className="data-list">
      <h3>Current {type} Data</h3>
      <div className="data-grid">
        {data.map(item => (
          <div key={item.id} className="data-item">
            <h4>{item.name}</h4>
            <p><strong>Type:</strong> {item.type}</p>
            {item.location && <p><strong>Location:</strong> {item.location}</p>}
            {item.region && <p><strong>Region:</strong> {item.region}</p>}
            <p className="description">{item.description.substring(0, 100)}...</p>
            <div className="item-actions">
              <button
                onClick={() => handleEdit(item)}
                className="edit-btn"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item.id, item.name)}
                className="delete-btn"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="manage-data-container">
      <div className="manage-header">
        <h1>Manage Cultural & Heritage Data</h1>
        <p>Add, edit, or delete cultural and monument information</p>
      </div>
      
      <div className="tab-navigation">
        <button
          className={`tab-btn ${activeTab === 'cultural' ? 'active' : ''}`}
          onClick={() => setActiveTab('cultural')}
        >
          Cultural Data
        </button>
        <button
          className={`tab-btn ${activeTab === 'monuments' ? 'active' : ''}`}
          onClick={() => setActiveTab('monuments')}
        >
          Monuments
        </button>
        <button
          className={`tab-btn ${activeTab === 'heritage' ? 'active' : ''}`}
          onClick={() => setActiveTab('heritage')}
        >
          Heritage Sites
        </button>
      </div>
      
      <div className="tab-content">
        {activeTab === 'cultural' && (
          <div>
            {renderCulturalForm()}
            {renderDataList(culturalData, 'Cultural')}
          </div>
        )}
        
        {activeTab === 'monuments' && (
          <div>
            {renderMonumentForm()}
            {renderDataList(monumentData, 'Monument')}
          </div>
        )}
        
        {activeTab === 'heritage' && (
          <div>
            {renderDataList(heritageSites, 'Heritage Site')}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageData;