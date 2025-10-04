import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../api/auth';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);
    try {
      await register(username, password);
      setSuccess('Registration successful! Redirecting to login...');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{ width: '100%', maxWidth: '440px' }}>
        <div style={{
          background: 'white',
          borderRadius: '20px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          padding: '40px',
        }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <div style={{
              width: '70px',
              height: '70px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px',
              boxShadow: '0 10px 25px rgba(102, 126, 234, 0.3)'
            }}>
              <svg width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="8.5" cy="7" r="4"/>
                <line x1="20" y1="8" x2="20" y2="14"/>
                <line x1="23" y1="11" x2="17" y2="11"/>
              </svg>
            </div>
            <h2 style={{ fontSize: '32px', fontWeight: '700', color: '#1a1a1a', marginBottom: '8px' }}>
              Create Account
            </h2>
            <p style={{ color: '#666', fontSize: '15px' }}>
              Join us today and get started
            </p>
          </div>

          {/* Error Alert */}
          {error && (
            <div style={{
              background: '#fee',
              border: '1px solid #fcc',
              borderRadius: '10px',
              padding: '12px 16px',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c33" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              <span style={{ color: '#c33', fontSize: '14px' }}>{error}</span>
            </div>
          )}

          {/* Success Alert */}
          {success && (
            <div style={{
              background: '#d4edda',
              border: '1px solid #c3e6cb',
              borderRadius: '10px',
              padding: '12px 16px',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#155724" strokeWidth="2">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              <span style={{ color: '#155724', fontSize: '14px' }}>{success}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Username */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ 
                display: 'block', 
                fontSize: '14px', 
                fontWeight: '600', 
                color: '#333',
                marginBottom: '8px'
              }}>
                Username
              </label>
              <input 
                type="text"
                className="form-control"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid #e1e8ed',
                  borderRadius: '10px',
                  fontSize: '15px',
                  transition: 'all 0.3s',
                  outline: 'none'
                }}
                placeholder="Choose a username (min 3 characters)"
                value={username} 
                onChange={e => setUsername(e.target.value)}
                onFocus={e => e.target.style.borderColor = '#667eea'}
                onBlur={e => e.target.style.borderColor = '#e1e8ed'}
                required 
                minLength={3}
              />
              <small style={{ color: '#999', fontSize: '12px', marginTop: '4px', display: 'block' }}>
                At least 3 characters
              </small>
            </div>

            {/* Password */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{ 
                display: 'block', 
                fontSize: '14px', 
                fontWeight: '600', 
                color: '#333',
                marginBottom: '8px'
              }}>
                Password
              </label>
              <input 
                type="password"
                className="form-control"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid #e1e8ed',
                  borderRadius: '10px',
                  fontSize: '15px',
                  transition: 'all 0.3s',
                  outline: 'none'
                }}
                placeholder="Create a strong password (min 6 characters)"
                value={password} 
                onChange={e => setPassword(e.target.value)}
                onFocus={e => e.target.style.borderColor = '#667eea'}
                onBlur={e => e.target.style.borderColor = '#e1e8ed'}
                required 
                minLength={6}
              />
              <small style={{ color: '#999', fontSize: '12px', marginTop: '4px', display: 'block' }}>
                At least 6 characters
              </small>
            </div>

            {/* Submit Button */}
            <button 
              type="submit"
              disabled={isLoading || success}
              style={{
                width: '100%',
                padding: '14px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: (isLoading || success) ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s',
                boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
                opacity: (isLoading || success) ? 0.7 : 1
              }}
              onMouseOver={e => !(isLoading || success) && (e.target.style.transform = 'translateY(-2px)', e.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.5)')}
              onMouseOut={e => !(isLoading || success) && (e.target.style.transform = 'translateY(0)', e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)')}
            >
              {isLoading ? 'Creating Account...' : success ? 'Redirecting...' : 'Create Account'}
            </button>
          </form>

          {/* Divider */}
          <div style={{ 
            margin: '30px 0', 
            textAlign: 'center', 
            position: 'relative'
          }}>
            <span style={{ 
              background: 'white', 
              padding: '0 15px', 
              color: '#999',
              fontSize: '14px',
              position: 'relative',
              zIndex: 1
            }}>
              Already registered?
            </span>
            <div style={{ 
              position: 'absolute', 
              top: '50%', 
              left: 0, 
              right: 0, 
              height: '1px', 
              background: '#e1e8ed',
              zIndex: 0
            }}/>
          </div>

          {/* Login Link */}
          <div style={{ textAlign: 'center' }}>
            <p style={{ color: '#666', fontSize: '15px' }}>
              Already have an account?{' '}
              <Link to="/login" style={{ 
                color: '#667eea', 
                textDecoration: 'none',
                fontWeight: '600'
              }}>
                Sign in here
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <p style={{ 
          textAlign: 'center', 
          color: 'rgba(255,255,255,0.8)', 
          fontSize: '13px',
          marginTop: '20px'
        }}>
          By creating an account, you agree to our Terms & Privacy Policy
        </p>
      </div>
    </div>
  );
}