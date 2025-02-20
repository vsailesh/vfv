import React, { useState, useEffect } from 'react';
import '../styles/Professors.css';

const Professors = () => {
  const [professors, setProfessors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProfessor, setSelectedProfessor] = useState(null);

  useEffect(() => {
    const mockProfessors = [
      {
        id: 1,
        name: "Dr. Sarah Johnson",
        specialization: "Web Development",
        image: "https://via.placeholder.com/300x300",
        experience: "15 years",
        courses: ["React Fundamentals", "Advanced JavaScript"],
        bio: "Dr. Johnson is a leading expert in web development with extensive industry experience."
      },
      {
        id: 2,
        name: "Prof. Michael Chen",
        specialization: "Software Architecture",
        image: "https://via.placeholder.com/300x300",
        experience: "12 years",
        courses: ["System Design", "Cloud Computing"],
        bio: "Professor Chen specializes in software architecture and distributed systems."
      },
      {
        id: 3,
        name: "Dr. Emily Brown",
        specialization: "UI/UX Design",
        image: "https://via.placeholder.com/300x300",
        experience: "10 years",
        courses: ["User Experience Design", "Interface Psychology"],
        bio: "Dr. Brown combines design theory with practical application in digital interfaces."
      }
    ];

    const fetchProfessors = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setProfessors(mockProfessors);
        setLoading(false);
      } catch (err) {
        setError('Failed to load professors');
        setLoading(false);
      }
    };

    fetchProfessors();
  }, []);

  const handleProfessorClick = (professor) => {
    setSelectedProfessor(professor);
  };

  if (loading) return (
    <div className="professors-loading">
      <div className="loader"></div>
      <p>Loading professors...</p>
    </div>
  );

  if (error) return (
    <div className="professors-error">
      <p>Error: {error}</p>
    </div>
  );

  return (
    <div className="professors-container">
      <h1>Our Expert Professors</h1>
      <div className="professors-grid">
        {professors.map(professor => (
          <div 
            key={professor.id} 
            className="professor-card"
            onClick={() => handleProfessorClick(professor)}
          >
            <div className="professor-image">
              <img src={professor.image} alt={professor.name} />
              <div className="professor-specialization">{professor.specialization}</div>
            </div>
            <div className="professor-content">
              <h3>{professor.name}</h3>
              <p>{professor.bio}</p>
              <div className="professor-details">
                <span className="experience">
                  <i className="far fa-clock"></i> {professor.experience}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedProfessor && (
        <div className="professor-modal">
          <div className="modal-content">
            <button 
              className="close-button"
              onClick={() => setSelectedProfessor(null)}
            >
              ×
            </button>
            <h2>{selectedProfessor.name}</h2>
            <img src={selectedProfessor.image} alt={selectedProfessor.name} />
            <p>{selectedProfessor.bio}</p>
            <div className="modal-details">
              <span>Experience: {selectedProfessor.experience}</span>
              <span>Specialization: {selectedProfessor.specialization}</span>
            </div>
            <div className="professor-courses">
              <h3>Courses Taught:</h3>
              <ul>
                {selectedProfessor.courses.map((course, index) => (
                  <li key={index}>{course}</li>
                ))}
              </ul>
            </div>
            <button className="contact-button">Contact Professor</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Professors;