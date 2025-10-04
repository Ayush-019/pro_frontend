import React from 'react';
import { useNavigate, NavLink } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any token or user info if you stored them
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '16px 32px',
      boxShadow: '0 4px 20px rgba(102, 126, 234, 0.3)',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        {/* Logo/Brand */}
        <NavLink 
          to="/products"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            textDecoration: 'none',
            color: 'white',
            transition: 'transform 0.2s'
          }}
          onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          <div style={{
            width: '40px',
            height: '40px',
            background: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(10px)'
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
              <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
              <line x1="12" y1="22.08" x2="12" y2="12"/>
            </svg>
          </div>
          <div>
            <div style={{
              fontSize: '22px',
              fontWeight: '700',
              letterSpacing: '-0.5px'
            }}>
              Inventory Pro
            </div>
            <div style={{
              fontSize: '11px',
              opacity: 0.9,
              fontWeight: '500',
              letterSpacing: '0.5px'
            }}>
              MANAGEMENT SYSTEM
            </div>
          </div>
        </NavLink>

        {/* Right Side - User Info & Logout */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '20px'
        }}>

          {/* Logout Button */}
          <button 
            onClick={handleLogout}
            style={{
              padding: '10px 20px',
              background: 'rgba(255, 255, 255, 0.2)',
              color: 'white',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '10px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.2s',
              backdropFilter: 'blur(10px)'
            }}
            onMouseOver={e => {
              e.target.style.background = 'rgba(255, 255, 255, 0.3)';
              e.target.style.borderColor = 'rgba(255, 255, 255, 0.5)';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseOut={e => {
              e.target.style.background = 'rgba(255, 255, 255, 0.2)';
              e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}