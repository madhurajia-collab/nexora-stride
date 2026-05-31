import React from 'react';

function Navbar({ currentPage, setCurrentPage }) {
  const links = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'sprintboard', label: 'Sprint Board' },
    { id: 'team', label: 'Team' },
    { id: 'reports', label: 'Reports' },
  ];

  return (
    <div style={{
      backgroundColor: '#161B22',
      borderBottom: '1px solid #30363D',
      padding: '16px 32px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ color: '#6D28D9', fontWeight: 'bold', fontSize: '12px', letterSpacing: '2px' }}>NEXORA</span>
        <span style={{ color: '#FFFFFF', fontWeight: 'bold', fontSize: '20px' }}>Stride</span>
      </div>

      {/* Links */}
      <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
        {links.map(link => (
          <span
            key={link.id}
            onClick={() => setCurrentPage(link.id)}
            style={{
              color: currentPage === link.id ? '#6D28D9' : '#8B949E',
              fontSize: '14px',
              fontWeight: currentPage === link.id ? 'bold' : 'normal',
              cursor: 'pointer'
            }}>
            {link.label}
          </span>
        ))}
        <div style={{
          backgroundColor: '#6D28D9',
          borderRadius: '20px',
          padding: '6px 16px',
          fontSize: '14px',
          color: '#FFFFFF'
        }}>
          👤 John's Team
        </div>
      </div>
    </div>
  );
}

export default Navbar;