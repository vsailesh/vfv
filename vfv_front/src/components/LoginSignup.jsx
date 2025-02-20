import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginSignup.css';
import { signInWithGoogle, signInWithApple } from '../utils/firebase';

const LoginSignup = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!isLogin && !formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      localStorage.setItem('userToken', 'dummy-token');
      navigate('/courses');
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        submit: 'Authentication failed. Please try again.'
      }));
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    setLoading(true);
    setTimeout(() => {
      console.log(`${provider} login clicked`);
      setLoading(false);
    }, 1000);
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const user = await signInWithGoogle();
      console.log("Login successful:", user);
      if (user) {
        // Store user info if needed
        localStorage.setItem('user', JSON.stringify(user));
        navigate('/courses');
      }
    } catch (error) {
      console.error("Login error:", error);
      let errorMessage = 'Google authentication failed. Please try again.';
      
      // More specific error messages
      if (error.code === 'auth/popup-closed-by-user') {
        errorMessage = 'Sign-in cancelled. Please try again.';
      } else if (error.code === 'auth/popup-blocked') {
        errorMessage = 'Pop-up blocked. Please allow pop-ups for this site.';
      }
      
      setErrors(prev => ({
        ...prev,
        submit: errorMessage
      }));
    } finally {
      setLoading(false);
    }
  };

  const handleAppleLogin = async () => {
    setLoading(true);
    try {
      const user = await signInWithApple();
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        navigate('/courses');
      }
    } catch (error) {
      console.error("Apple login error:", error);
      let errorMessage = 'Apple authentication failed. Please try again.';
      
      if (error.code === 'auth/popup-closed-by-user') {
        errorMessage = 'Sign-in cancelled. Please try again.';
      } else if (error.code === 'auth/popup-blocked') {
        errorMessage = 'Pop-up blocked. Please allow pop-ups for this site.';
      }
      
      setErrors(prev => ({
        ...prev,
        submit: errorMessage
      }));
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="login-loading">
        <div className="loader"></div>
        <p>Please wait...</p>
      </div>
    );
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>{isLogin ? 'Welcome Back' : 'Create Account'}</h1>
        <p className="login-subtitle">
          {isLogin 
            ? 'Sign in to continue your learning journey' 
            : 'Join us to start learning today'}
        </p>

        {errors.submit && (
          <div className="error-message">{errors.submit}</div>
        )}

        <div className="social-login">
          <button 
            className="social-btn google"
            onClick={handleGoogleLogin}
          >
            Continue with Google
          </button>
          <button 
            className="social-btn facebook"
            onClick={() => handleSocialLogin('Facebook')}
          >
            Continue with Facebook
          </button>
          <button 
            className="social-btn apple"
            onClick={handleAppleLogin}
          >
            Continue with Apple
          </button>
        </div>

        <div className="divider">
          <span>or continue with email</span>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {!isLogin && (
            <div className="form-group">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                className={errors.name ? 'error' : ''}
              />
              {errors.name && <span className="error-text">{errors.name}</span>}
            </div>
          )}

          <div className="form-group">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className="form-group">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className={errors.password ? 'error' : ''}
            />
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>

          {isLogin && (
            <div className="forgot-password">
              <a href="/reset-password">Forgot Password?</a>
            </div>
          )}

          <button type="submit" className="submit-button">
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="switch-form">
          <p>
            {isLogin 
              ? "Don't have an account? " 
              : "Already have an account? "}
            <button 
              type="button"
              className="switch-button"
              onClick={() => {
                setIsLogin(!isLogin);
                setFormData({ email: '', password: '', name: '' });
                setErrors({});
              }}
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;