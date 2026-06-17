import React from 'react';
import Navbar from './Navbar';
function Dashboard({ setCurrentPage, currentUser, setCurrentUser, tasks, moveTask, addTask, deleteTask }) {

  // ── Calculate numbers from real tasks ──────────────────────
  const total      = tasks.length;
  const completed  = tasks.filter(t => t.status === 'done').length;
  const inProgress = tasks.filter(t => t.status === 'inprogress').length;
  const blocked    = tasks.filter(t => t.status === 'blocked').length;
  const health     = Math.round((completed / total) * 100);

  const getStatusIcon = (status) => {
    if (status === 'done')       return '✅';
    if (status === 'inprogress') return '🔄';
    if (status === 'blocked')    return '🚫';
    return '⬜';
  };

  const getStatusColor = (status) => {
    if (status === 'done')       return '#16A34A';
    if (status === 'inprogress') return '#6D28D9';
    if (status === 'blocked')    return '#DC2626';
    return '#8B949E';
  };

  const getStatusLabel = (status) => {
    if (status === 'done')       return 'Done';
    if (status === 'inprogress') return 'In Progress';
    if (status === 'blocked')    return 'Blocked';
    return 'To Do';
  };

  return (
    <div style={{
      backgroundColor: '#0D1117',
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif',
      color: '#FFFFFF'
    }}>

      <Navbar currentPage="dashboard" setCurrentPage={setCurrentPage} currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <div style={{ padding: '32px' }}>

        {/* Sprint Header */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: '0 0 8px 0' }}>
            Sprint 12
          </h1>
          <p style={{ color: '#8B949E', margin: '0' }}>
            6 days remaining · May 28 – Jun 10, 2026
          </p>
        </div>

        {/* Stats Cards — calculated from real tasks */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '16px',
          marginBottom: '32px'
        }}>
          {[
            { label: 'Total Tasks',  value: total,      color: '#8B949E' },
            { label: 'Completed',    value: completed,  color: '#16A34A' },
            { label: 'In Progress',  value: inProgress, color: '#6D28D9' },
            { label: 'Blocked',      value: blocked,    color: '#DC2626' },
          ].map((stat, index) => (
            <div key={index} style={{
              backgroundColor: '#161B22',
              border: '1px solid #30363D',
              borderRadius: '12px',
              padding: '24px',
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: '42px',
                fontWeight: 'bold',
                color: stat.color,
                marginBottom: '8px'
              }}>
                {stat.value}
              </div>
              <div style={{ color: '#8B949E', fontSize: '14px' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Sprint Health — calculated from real tasks */}
        <div style={{
          backgroundColor: '#161B22',
          border: '1px solid #30363D',
          borderRadius: '12px',
          padding: '24px',
          marginBottom: '32px'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '12px'
          }}>
            <span style={{ fontWeight: 'bold' }}>Sprint Health</span>
            <span style={{
              color: health >= 70 ? '#16A34A' : health >= 40 ? '#EA580C' : '#DC2626',
              fontWeight: 'bold'
            }}>
              {health}% {health >= 70 ? 'On Track ✅' : health >= 40 ? 'At Risk ⚠️' : 'Behind 🚫'}
            </span>
          </div>
          <div style={{
            backgroundColor: '#30363D',
            borderRadius: '999px',
            height: '12px',
            overflow: 'hidden'
          }}>
            <div style={{
              backgroundColor: health >= 70 ? '#16A34A' : health >= 40 ? '#EA580C' : '#DC2626',
              width: `${health}%`,
              height: '100%',
              borderRadius: '999px',
              transition: 'width 0.5s ease'
            }}/>
          </div>
        </div>

        {/* Recent Tasks — from real tasks */}
        <div style={{
          backgroundColor: '#161B22',
          border: '1px solid #30363D',
          borderRadius: '12px',
          padding: '24px'
        }}>
          <h2 style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 20px 0' }}>
            Recent Tasks
          </h2>
          {tasks.map((task) => (
            <div key={task.id} style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '14px 0',
              borderBottom: '1px solid #30363D'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '20px' }}>{getStatusIcon(task.status)}</span>
                <span style={{ fontSize: '15px' }}>{task.title}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ color: '#8B949E', fontSize: '14px' }}>{task.assignee}</span>
                <span style={{
                  backgroundColor: getStatusColor(task.status),
                  color: '#FFFFFF',
                  padding: '4px 10px',
                  borderRadius: '999px',
                  fontSize: '12px',
                  fontWeight: 'bold'
                }}>
                  {getStatusLabel(task.status)}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Dashboard;