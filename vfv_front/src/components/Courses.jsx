import React, { useState, useEffect } from 'react';
import '../styles/Courses.css';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    const mockCourses = [
      {
        id: 1,
        name: "Introduction to React",
        description: "Learn the basics of React development",
        image: "https://via.placeholder.com/300x200",
        duration: "8 weeks",
        level: "Beginner"
      },
      {
        id: 2,
        name: "Advanced JavaScript",
        description: "Master JavaScript programming concepts",
        image: "https://via.placeholder.com/300x200",
        duration: "10 weeks",
        level: "Advanced"
      },
      {
        id: 3,
        name: "Web Design Fundamentals",
        description: "Learn essential web design principles",
        image: "https://via.placeholder.com/300x200",
        duration: "6 weeks",
        level: "Intermediate"
      }
    ];

    const fetchCourses = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setCourses(mockCourses);
        setLoading(false);
      } catch (err) {
        setError('Failed to load courses');
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleCourseClick = (course) => {
    setSelectedCourse(course);
  };

  if (loading) return (
    <div className="courses-loading">
      <div className="loader"></div>
      <p>Loading courses...</p>
    </div>
  );

  if (error) return (
    <div className="courses-error">
      <p>Error: {error}</p>
    </div>
  );

  return (
    <div className="courses-container">
      <h1>Available Courses</h1>
      <div className="courses-grid">
        {courses.map(course => (
          <div 
            key={course.id} 
            className="course-card"
            onClick={() => handleCourseClick(course)}
          >
            <div className="course-image">
              <img 
                src={course.image} 
                alt={course.name} 
                loading="lazy"
                onLoad={(e) => e.target.removeAttribute('loading')}
              />
              <div className="course-level">{course.level}</div>
              <div className="course-price">${course.price}</div>
            </div>
            <div className="course-content">
              <h3>{course.name}</h3>
              <p>{course.description}</p>
              <div className="course-details">
                <span className="duration">
                  <i className="far fa-clock"></i> {course.duration}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedCourse && (
        <div className="course-modal">
          <div className="modal-content">
            <button 
              className="close-button"
              onClick={() => setSelectedCourse(null)}
            >
              ×
            </button>
            <h2>{selectedCourse.name}</h2>
            <img src={selectedCourse.image} alt={selectedCourse.name} />
            <p>{selectedCourse.description}</p>
            <div className="modal-details">
              <span>Duration: {selectedCourse.duration}</span>
              <span>Level: {selectedCourse.level}</span>
            </div>
            <button className="enroll-button">Enroll Now</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Courses;