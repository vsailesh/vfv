import React from 'react';
import { FaLinkedin, FaTwitter, FaGithub, FaHeart, FaInstagram, FaYoutube } from 'react-icons/fa';
import '../styles/Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const handleSocialClick = (platform) => {
    const urls = {
      linkedin: 'https://linkedin.com/in/your-profile',
      twitter: 'https://twitter.com/your-profile',
      github: 'https://github.com/your-profile',
      instagram: 'https://instagram.com/vedasforvaidyas',
      youtube: 'https://youtube.com/@vedasforvaidyas'
    };
    window.open(urls[platform], '_blank');
  };

  return (
    <footer>
      <p>
        Made with <FaHeart className="heart-icon" /> 
        © {currentYear} Vedas for Vaidyas
      </p>
      <div className="footer-social-links">
        <a 
          href="#" 
          onClick={(e) => {
            e.preventDefault();
            handleSocialClick('instagram');
          }}
          aria-label="Instagram Profile"
        >
          <FaInstagram />
        </a>
        <a 
          href="#" 
          onClick={(e) => {
            e.preventDefault();
            handleSocialClick('youtube');
          }}
          aria-label="YouTube Channel"
        >
          <FaYoutube />
        </a>
        <a 
          href="#" 
          onClick={(e) => {
            e.preventDefault();
            handleSocialClick('linkedin');
          }}
          aria-label="LinkedIn Profile"
        >
          <FaLinkedin />
        </a>
        <a 
          href="#" 
          onClick={(e) => {
            e.preventDefault();
            handleSocialClick('twitter');
          }}
          aria-label="Twitter Profile"
        >
          <FaTwitter />
        </a>
        <a 
          href="#" 
          onClick={(e) => {
            e.preventDefault();
            handleSocialClick('github');
          }}
          aria-label="GitHub Profile"
        >
          <FaGithub />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
