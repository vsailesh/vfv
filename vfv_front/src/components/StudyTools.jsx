import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/StudyTools.css';
import { getStudyTools } from '../services/api';

const StudyTools = () => {
  const tools = [
    {
      id: 1,
      name: 'Online Library',
      icon: '📚',
      description: 'Access thousands of Ayurvedic texts and research papers',
      features: ['24/7 Access', 'Searchable Content', 'Downloadable PDFs'],
      link: '/library'
    },
    {
      id: 2,
      name: 'E-books',
      icon: '📱',
      description: 'Interactive e-books with multimedia content',
      features: ['Offline Access', 'Interactive Diagrams', 'Study Notes'],
      link: '/ebooks'
    },
    {
      id: 3,
      name: 'Research Papers',
      icon: '🔍',
      description: 'Latest research papers and publications in Ayurveda',
      features: ['Peer Reviewed', 'Citation Tools', 'Regular Updates'],
      link: '/research'
    },
    {
      id: 4,
      name: 'Study Notes',
      icon: '✏️',
      description: 'Comprehensive study notes and summaries',
      features: ['Organized Topics', 'Quick Review', 'Downloadable'],
      link: '/notes'
    },
    {
      id: 5,
      name: 'Practice Tests',
      icon: '📝',
      description: 'Self-assessment tools and practice examinations',
      features: ['Instant Results', 'Performance Analytics', 'Custom Tests'],
      link: '/tests'
    },
    {
      id: 6,
      name: 'Video Lectures',
      icon: '🎥',
      description: 'Expert video lectures and demonstrations',
      features: ['HD Quality', 'Subtitles', 'Playback Control'],
      link: '/videos'
    }
  ];

  return (
    <div className="study-tools-container">
      <div className="study-tools-header">
        <h1>Study Tools</h1>
        <p className="subtitle">Enhance your learning with our comprehensive study tools</p>
      </div>

      <div className="search-bar">
        <input 
          type="text" 
          placeholder="Search study tools..."
          className="search-input"
        />
        <button className="search-btn">Search</button>
      </div>

      <div className="tools-grid">
        {tools.map(tool => (
          <Link to={tool.link} key={tool.id} className="tool-card">
            <div className="tool-icon">{tool.icon}</div>
            <h3 className="tool-name">{tool.name}</h3>
            <p className="tool-description">{tool.description}</p>
            <div className="features-list">
              {tool.features.map((feature, index) => (
                <span key={index} className="feature-tag">
                  {feature}
                </span>
              ))}
            </div>
            <button className="explore-btn">
              Explore
              <span className="arrow">→</span>
            </button>
          </Link>
        ))}
      </div>

      <div className="quick-stats">
        <div className="stat-card">
          <h4>Total Resources</h4>
          <p>1000+</p>
        </div>
        <div className="stat-card">
          <h4>Active Users</h4>
          <p>5000+</p>
        </div>
        <div className="stat-card">
          <h4>Success Rate</h4>
          <p>95%</p>
        </div>
      </div>

      <div className="help-section">
        <h3>Need Help?</h3>
        <p>Our support team is available 24/7 to assist you</p>
        <button className="contact-support-btn">Contact Support</button>
      </div>
    </div>
  );
};

export default StudyTools;