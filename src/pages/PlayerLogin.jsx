import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const PlayerLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    phone: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem('playerToken');
    if (token) {
      navigate('/player/dashboard');
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!isLogin) {
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
      
      if (!formData.fullName) {
        newErrors.fullName = 'Full name is required';
      }
      
      if (!formData.phone) {
        newErrors.phone = 'Phone number is required';
      } else if (!/^[0-9+\-\s]+$/.test(formData.phone)) {
        newErrors.phone = 'Please enter a valid phone number';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // Simulate API call - replace with your actual backend endpoint
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful login
      const mockPlayer = {
        _id: '12345',
        email: formData.email,
        fullName: 'John Doe',
        position: 'Striker',
        jerseyNumber: 10,
        team: 'Academy Team A'
      };
      
      // Store token and user data
      localStorage.setItem('playerToken', 'mock-jwt-token-12345');
      localStorage.setItem('playerData', JSON.stringify(mockPlayer));
      
      // Show success message
      alert('Login successful!');
      
      // Redirect to dashboard
      const from = location.state?.from?.pathname || '/player/dashboard';
      navigate(from);
      
    } catch (error) {
      console.error('Login error:', error);
      setErrors({ general: 'Invalid email or password. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // Simulate API call - replace with your actual backend endpoint
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful signup
      const mockPlayer = {
        _id: '67890',
        email: formData.email,
        fullName: formData.fullName,
        phone: formData.phone,
        position: 'To be assigned',
        team: 'New Player'
      };
      
      // Store token and user data
      localStorage.setItem('playerToken', 'mock-jwt-token-67890');
      localStorage.setItem('playerData', JSON.stringify(mockPlayer));
      
      // Show success message
      alert('Registration successful! Welcome to the academy!');
      
      // Redirect to dashboard
      navigate('/player/dashboard');
      
    } catch (error) {
      console.error('Signup error:', error);
      setErrors({ general: 'Registration failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    const email = prompt('Please enter your email address to reset password:');
    if (email) {
      // Implement password reset logic
      alert(`Password reset link has been sent to ${email}`);
    }
  };

  return (
    <div className="player-login-container">
      <div className="login-wrapper">
        {/* Left Panel - Branding */}
        <div className="login-left-panel">
          <div className="brand-section">
            <div className="logo">
              <div className="logo-circle">
                <span className="logo-text">FA</span>
              </div>
            </div>
            <h1 className="academy-name">Football Academy</h1>
            <p className="academy-tagline">Where Champions Are Made</p>
          </div>
          
          <div className="features-section">
            <div className="feature-item">
              <div className="feature-icon">⚽</div>
              <div className="feature-text">
                <h3>Professional Training</h3>
                <p>Train with certified coaches using modern techniques</p>
              </div>
            </div>
            
            <div className="feature-item">
              <div className="feature-icon">🏆</div>
              <div className="feature-text">
                <h3>Tournaments & Matches</h3>
                <p>Regular competitive matches and tournament participation</p>
              </div>
            </div>
            
            <div className="feature-item">
              <div className="feature-icon">📊</div>
              <div className="feature-text">
                <h3>Progress Tracking</h3>
                <p>Monitor your development with detailed performance analytics</p>
              </div>
            </div>
          </div>
          
          <div className="quote-section">
            <p className="quote">"The more difficult the victory, the greater the happiness in winning."</p>
            <p className="quote-author">- Pelé</p>
          </div>
        </div>

        {/* Right Panel - Form */}
        <div className="login-right-panel">
          <div className="form-container">
            <div className="form-header">
              <h2>{isLogin ? 'Welcome Back!' : 'Join Our Academy'}</h2>
              <p>
                {isLogin 
                  ? 'Sign in to your account to access your profile, training schedule, and performance stats.'
                  : 'Create your account to start your journey with our football academy.'
                }
              </p>
            </div>

            {/* Tab Switcher */}
            <div className="tab-switcher">
              <button 
                className={`tab-btn ${isLogin ? 'active' : ''}`}
                onClick={() => setIsLogin(true)}
              >
                Sign In
              </button>
              <button 
                className={`tab-btn ${!isLogin ? 'active' : ''}`}
                onClick={() => setIsLogin(false)}
              >
                Sign Up
              </button>
            </div>

            {/* Error Message */}
            {errors.general && (
              <div className="error-alert">
                <span className="error-icon">⚠️</span>
                <span>{errors.general}</span>
              </div>
            )}

            <form onSubmit={isLogin ? handleLogin : handleSignup}>
              {!isLogin && (
                <div className="form-group">
                  <label htmlFor="fullName">Full Name *</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className={errors.fullName ? 'error' : ''}
                  />
                  {errors.fullName && <span className="error-message">{errors.fullName}</span>}
                </div>
              )}

              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="player@example.com"
                  className={errors.email ? 'error' : ''}
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>

              {!isLogin && (
                <div className="form-group">
                  <label htmlFor="phone">Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="080XXXXXXXX"
                    className={errors.phone ? 'error' : ''}
                  />
                  {errors.phone && <span className="error-message">{errors.phone}</span>}
                </div>
              )}

              <div className="form-group">
                <label htmlFor="password">Password *</label>
                <div className="password-input-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className={errors.password ? 'error' : ''}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? '🙈' : '👁️'}
                  </button>
                </div>
                {errors.password && <span className="error-message">{errors.password}</span>}
              </div>

              {!isLogin && (
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password *</label>
                  <div className="password-input-wrapper">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm your password"
                      className={errors.confirmPassword ? 'error' : ''}
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? '🙈' : '👁️'}
                    </button>
                  </div>
                  {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
                </div>
              )}

              {isLogin && (
                <div className="form-options">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleChange}
                    />
                    <span className="checkmark"></span>
                    Remember me
                  </label>
                  <button 
                    type="button" 
                    className="forgot-password-btn"
                    onClick={handleForgotPassword}
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              <button 
                type="submit" 
                className="submit-btn"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="spinner"></span>
                    {isLogin ? 'Signing In...' : 'Creating Account...'}
                  </>
                ) : (
                  isLogin ? 'Sign In' : 'Sign Up'
                )}
              </button>

              {isLogin && (
                <div className="divider">
                  <span>Or continue with</span>
                </div>
              )}

              {isLogin && (
                <div className="social-login">
                  <button type="button" className="social-btn google-btn">
                    <span className="social-icon">G</span>
                    Continue with Google
                  </button>
                  <button type="button" className="social-btn facebook-btn">
                    <span className="social-icon">f</span>
                    Continue with Facebook
                  </button>
                </div>
              )}
            </form>

            <div className="form-footer">
              {isLogin ? (
                <p>
                  Don't have an account?{' '}
                  <button 
                    type="button" 
                    className="switch-btn"
                    onClick={() => setIsLogin(false)}
                  >
                    Sign up here
                  </button>
                </p>
              ) : (
                <p>
                  Already have an account?{' '}
                  <button 
                    type="button" 
                    className="switch-btn"
                    onClick={() => setIsLogin(true)}
                  >
                    Sign in here
                  </button>
                </p>
              )}
              
              <p className="terms-notice">
                By continuing, you agree to our{' '}
                <Link to="/terms" className="terms-link">Terms of Service</Link>{' '}
                and{' '}
                <Link to="/privacy" className="terms-link">Privacy Policy</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerLogin;