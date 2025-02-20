import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Courses from './components/Courses';
import Professors from './components/Professors';
import ContactUs from './components/ContactUs';
import LoginSignup from './components/LoginSignup';
import StudyTools from './components/StudyTools';
import Footer from './components/Footer';
import AboutUs from './components/AboutUs';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="main-content">
          <Routes>
            <Route exact path="/" element={<Hero />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/professors" element={<Professors />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/study-tools" element={<StudyTools />} />
            <Route path="/login-signup" element={<LoginSignup />} />
            <Route path="/about-us" element={<AboutUs />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;