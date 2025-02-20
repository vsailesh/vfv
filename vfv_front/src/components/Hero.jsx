import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../styles/Hero.css';

// Import images - using require for better error handling
const scrollImage = require('../Assets/v for v logo 1.png');
const playStoreIcon = require('../Assets/playstore.png');
const appStoreIcon = require('../Assets/appstore.jpeg');

const Hero = () => {
  const navigate = useNavigate();
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const loadImages = async () => {
      try {
        const imageUrls = [scrollImage, playStoreIcon, appStoreIcon];
        await Promise.all(
          imageUrls.map(
            (url) =>
              new Promise((resolve, reject) => {
                const img = new Image();
                img.src = url;
                img.onload = resolve;
                img.onerror = reject;
              })
          )
        );
        setImagesLoaded(true);
      } catch (error) {
        console.error('Error loading images:', error);
        setImageError(true);
        setImagesLoaded(true); // Still show content even if images fail
      }
    };

    loadImages();
  }, []);

  const handleGetStarted = () => {
    try {
      navigate('/login-signup');
    } catch (error) {
      console.error('Navigation error:', error);
      // Fallback navigation
      window.location.href = '/login-signup';
    }
  };

  const handleAppStoreClick = () => {
    // Add your app store links here
    window.open('your-app-store-link', '_blank');
  };

  const handlePlayStoreClick = () => {
    // Add your play store links here
    window.open('your-play-store-link', '_blank');
  };

  if (!imagesLoaded) {
    return (
      <div className="hero-section loading">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="hero-section">
      <div className="particles-background"></div>
      
      <div className="hero-content">
        <h1 className="animate-title">
          {['V', 'E', 'D', 'A', 'S', ' ', 'F', 'O', 'R', ' ', 
            'V', 'A', 'I', 'D', 'Y', 'A', 'S'].map((letter, index) => (
            <span 
              key={index} 
              style={{ '--char-index': index }}
              className={letter === ' ' ? 'space' : ''}
            >
              {letter}
            </span>
          ))}
        </h1>

        <div className="scroll-container">
          {!imageError && (
            <img 
              src={scrollImage}
              alt="Vedas For Vaidyas Logo" 
              className="scroll-image floating parallax"
              onError={(e) => {
                e.target.style.display = 'none';
                setImageError(true);
              }}
            />
          )}
          <div className="scroll-glow"></div>
        </div>

        <button 
          className="get-started-btn"
          onClick={handleGetStarted}
          aria-label="Get Started"
        >
          <span className="btn-text">Get Started</span>
          <span className="btn-icon">→</span>
        </button>

        <p className="description">
          <span className="highlight">Discover the Future of Ayurvedic Education</span>
          <br />
          <span className="subtitle">
            At Vedas for Vaidyas, we are revolutionizing Ayurvedic education with 
            modern technology and traditional wisdom
          </span>
        </p>

        <div className="app-buttons">
          <button 
            className="app-btn"
            onClick={handlePlayStoreClick}
            aria-label="Download from Play Store"
          >
            {!imageError && (
              <img 
                src={playStoreIcon} 
                alt="Play Store" 
                className="store-icon"
                onError={(e) => e.target.style.display = 'none'}
              />
            )}
            <div className="btn-text">
              <span className="small-text">GET IT ON</span>
              <span className="large-text">Play Store</span>
            </div>
          </button>
          <button 
            className="app-btn"
            onClick={handleAppStoreClick}
            aria-label="Download from App Store"
          >
            {!imageError && (
              <img 
                src={appStoreIcon} 
                alt="App Store" 
                className="store-icon"
                onError={(e) => e.target.style.display = 'none'}
              />
            )}
            <div className="btn-text">
              <span className="small-text">Download on the</span>
              <span className="large-text">App Store</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
