// filepath: /c:/Users/venig/Documents/my-app/src/components/AboutUs.jsx
import React from 'react';
import '../styles/AboutUs.css';
import { FaGraduationCap, FaUsers, FaLaptopCode, FaHandshake } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const AboutUs = () => {
  const navigate = useNavigate();

  const handleContactClick = () => {
    navigate('/contact-us');
  };

  return (
    <div className="about-container">
      <div className="about-header">
        <h1>About Us</h1>
        <p className="subtitle">Empowering Students Through Technology and Education</p>
      </div>

      <div className="mission-section">
        <h2>Our Mission</h2>
        <p>
          We are dedicated to revolutionizing the educational experience by connecting students 
          with expert professors and providing cutting-edge study tools. Our platform aims to 
          make quality education accessible, engaging, and effective for everyone.
        </p>
      </div>

      <div className="features-grid">
        <div className="feature-card">
          <FaGraduationCap className="feature-icon" />
          <h3>Expert Education</h3>
          <p>Access to qualified professors and comprehensive course materials</p>
        </div>

        <div className="feature-card">
          <FaUsers className="feature-icon" />
          <h3>Community Learning</h3>
          <p>Connect with fellow students and create study groups</p>
        </div>

        <div className="feature-card">
          <FaLaptopCode className="feature-icon" />
          <h3>Modern Tools</h3>
          <p>State-of-the-art study tools and resources</p>
        </div>

        <div className="feature-card">
          <FaHandshake className="feature-icon" />
          <h3>Personal Support</h3>
          <p>Dedicated support team to help you succeed</p>
        </div>
      </div>

      <div className="stats-section">
        <div className="stat-card">
          <h3>1000+</h3>
          <p>Active Students</p>
        </div>
        <div className="stat-card">
          <h3>50+</h3>
          <p>Expert Professors</p>
        </div>
        <div className="stat-card">
          <h3>100+</h3>
          <p>Courses Available</p>
        </div>
      </div>

      <div className="vision-section">
        <h2>Our Vision</h2>
        <p>
          We envision a future where quality education knows no boundaries. Through our 
          platform, we strive to create an inclusive learning environment that adapts to 
          each student's needs while maintaining high academic standards.
        </p>
      </div>

      <div className="contact-section">
        <h2>Get In Touch</h2>
        <p>Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
        <button 
          className="contact-btn" 
          onClick={handleContactClick}
        >
          Contact Us
        </button>
      </div>
    </div>
  );
};

export default AboutUs;