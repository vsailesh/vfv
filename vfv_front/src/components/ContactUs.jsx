import React, { useState } from 'react';
import '../styles/ContactUs.css';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h1>Contact Us</h1>
      <div className="contact-container">
        <div className="contact-content">
          <div className="contact-info">
            <h1>Get in Touch</h1>
            <p>We'd love to hear from you. Please fill out this form.</p>
            
            <div className="contact-details">
              <div className="contact-item">
                <div className="icon">📍</div>
                <div className="detail">
                  <h3>Address</h3>
                  <p>123 Education Street, Learning City, 12345</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="icon">📧</div>
                <div className="detail">
                  <h3>Email</h3>
                  <p>contact@yourdomain.com</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="icon">📱</div>
                <div className="detail">
                  <h3>Phone</h3>
                  <p>+1 (234) 567-8900</p>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form-container">
            <form onSubmit={handleSubmit} className="contact-form">
              {submitStatus === 'success' && (
                <div className="success-message">
                  Message sent successfully!
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="error-message">
                  Failed to send message. Please try again.
                </div>
              )}

              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your Name"
                />
              </div>

              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Your Email"
                />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="Subject"
                />
              </div>

              <div className="form-group">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Your Message"
                  rows="5"
                ></textarea>
              </div>

              <button 
                type="submit" 
                className={`submit-button ${isSubmitting ? 'loading' : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? <span className="loader"></span> : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;