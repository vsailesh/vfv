import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="dashboard">
      <h1>Welcome to Dashboard</h1>
      {/* Add your dashboard content here */}
    </div>
  );
}

export default Dashboard; 