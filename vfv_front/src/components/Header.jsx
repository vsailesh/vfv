import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';
import logo from '../Assets/v for v logo 1.png';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="logo">
        <Link to="/">
          <img 
            src={logo} 
            alt="Logo" 
            className="logo-image"
            onError={(e) => {
              console.error('Error loading logo');
              e.target.style.display = 'none';
            }}
          />
        </Link>
      </div>
      <nav>
        <ul className="nav-links">
          <li><Link to="/about-us" className="nav-item">About Us</Link></li>
          <li><Link to="/courses" className="nav-item">Courses</Link></li>
          <li><Link to="/professors" className="nav-item">Professors</Link></li>
          <li><Link to="/study-tools" className="nav-item">Study Tools</Link></li>
          <li><Link to="/contact-us" className="nav-item">Contact Us</Link></li>
        </ul>
      </nav>
      <Link to="/login-signup">
        <button className="login-btn">Login/Signup</button>
      </Link>
    </header>
  );
};

export default Header;