import React, { useState } from 'react';
import Dashboard from './Dashboard';
import SprintBoard from './SprintBoard';
import TeamView from './TeamView';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');

  if (loggedIn) {
    if (currentPage === 'sprintboard') {
      return <SprintBoard setCurrentPage={setCurrentPage} />;
    }
    if (currentPage === 'team') {
      return <TeamView setCurrentPage={setCurrentPage} />;
    }
    return <Dashboard setCurrentPage={setCurrentPage} />;
  }

  return (
    <div style={{
      backgroundColor: '#0D1117',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        textAlign: 'center',
        padding: '60px',
        backgroundColor: '#161B22',
        borderRadius: '16px',
        border: '1px solid #30363D',
        width: '380px'
      }}>
        <div style={{
          fontSize: '14px',
          color: '#6D28D9',
          fontWeight: 'bold',
          letterSpacing: '4px',
          marginBottom: '8px'
        }}>
          NEXORA
        </div>

        <h1 style={{
          fontSize: '42px',
          fontWeight: 'bold',
          color: '#FFFFFF',
          margin: '0 0 8px 0'
        }}>
          Stride
        </h1>

        <p style={{
          color: '#8B949E',
          fontSize: '14px',
          marginBottom: '40px'
        }}>
          AI Sprint Intelligence Dashboard
        </p>

        <button
          onClick={() => setLoggedIn(true)}
          style={{
            backgroundColor: '#6D28D9',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '8px',
            padding: '14px 32px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer',
            width: '100%',
            marginBottom: '24px'
          }}>
          Login with GitHub
        </button>

        <p style={{
          color: '#30363D',
          fontSize: '12px',
          margin: '0'
        }}>
          Track. Predict. Deliver.
        </p>
      </div>
    </div>
  );
}

export default App;