import { useState } from "react";
import API_URL from "../config/api";
import "./Auth.css";


export default function Login({ onLogin, onSwitchToRegister }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    rememberMe: false
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('beatbox-token', data.token);
        localStorage.setItem('beatbox-user', JSON.stringify(data.user));
        onLogin(data.user);
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Network error. Please check if backend is running on port 5000.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    const email = prompt("Enter your email address:");
    if (email) {
      fetch(`${API_URL}/api/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })
        .then(res => res.json())
        .then(data => alert(data.message))
        .catch(() => alert('Error sending reset link'));
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="auth-header">
          <img src="/logo_new.jpg" alt="BeatBox" className="auth-logo" />
          <h1>Welcome Back</h1>
          <p>Sign in to continue to BeatBox</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && (
            <div className="error-message">
              <i className="fas fa-exclamation-circle"></i>
              {error}
            </div>
          )}

          <div className="input-group">
            <i className="fas fa-user"></i>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <i className="fas fa-lock"></i>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <i 
              className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} toggle-password`}
              onClick={() => setShowPassword(!showPassword)}
            ></i>
          </div>

          <div className="form-options">
            <label className="remember-me">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
              />
              <span>Remember me</span>
            </label>
            <button 
              type="button" 
              className="forgot-password"
              onClick={handleForgotPassword}
            >
              Forgot Password?
            </button>
          </div>

          <button type="submit" className="auth-submit-btn" disabled={loading}>
            {loading ? (
              <>
                <i className="fas fa-spinner fa-spin"></i>
                Signing in...
              </>
            ) : (
              <>
                <i className="fas fa-sign-in-alt"></i>
                Sign In
              </>
            )}
          </button>
        </form>

        <div className="auth-footer">
          <p>Don't have an account?</p>
          <button 
            className="switch-auth-btn"
            onClick={onSwitchToRegister}
          >
            Create Account
          </button>
        </div>
      </div>

      <div className="auth-background">
        <div className="music-note note-1">♪</div>
        <div className="music-note note-2">♫</div>
        <div className="music-note note-3">♪</div>
        <div className="music-note note-4">♫</div>
      </div>
    </div>
  );
}