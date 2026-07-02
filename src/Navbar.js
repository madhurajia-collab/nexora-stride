import React from 'react';

function Navbar({ currentPage, setCurrentPage, currentUser, setCurrentUser }) {
  const links = [
    { id: 'mytasks',     label: 'My Tasks' },
    { id: 'dashboard',   label: 'Dashboard' },
    { id: 'sprintboard', label: 'Sprint Board' },
    { id: 'team',        label: 'Team' },
    { id: 'reports',     label: 'Reports' },
  ];

  const pageOrder = ['mytasks', 'dashboard', 'sprintboard', 'team', 'reports'];
  const currentIndex = pageOrder.indexOf(currentPage);

  const goBack = () => {
    if (currentIndex > 0) {
      setCurrentPage(pageOrder[currentIndex - 1]);
    } else {
      setCurrentUser(null);
    }
  };

  return (
    <div style={{
      backgroundColor: '#161B22',
      borderBottom: '1px solid #30363D',
      padding: '16px 32px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      {/* Left side — back button + logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button
          onClick={goBack}
          title="Go back"
          style={{
            backgroundColor: '#0D1117',
            border: '1px solid #30363D',
            color: '#8B949E',
            borderRadius: '8px',
            padding: '6px 12px',
            fontSize: '14px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
          ← Back
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ color: '#6D28D9', fontWeight: 'bold', fontSize: '12px', letterSpacing: '2px' }}>NEXORA</span>
          <span style={{ color: '#FFFFFF', fontWeight: 'bold', fontSize: '20px' }}>Stride</span>
        </div>
      </div>

      {/* Right side — links + user */}
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
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
        <div
          onClick={() => setCurrentPage('profile')}
          title="Click to switch user"
          style={{
            backgroundColor: '#6D28D9',
            borderRadius: '20px',
            padding: '6px 16px',
            fontSize: '14px',
            color: '#FFFFFF',
            cursor: 'pointer'
          }}>
          👤 {currentUser}
        </div>
      </div>
    </div>
  );
}

export default Navbar;