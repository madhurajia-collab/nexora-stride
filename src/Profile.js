import React from 'react';
import Navbar from './Navbar';

function Profile({ setCurrentPage, currentUser, setCurrentUser, tasks }) {

  const myTasks    = tasks.filter(t => t.assignee === currentUser);
  const done       = myTasks.filter(t => t.status === 'done').length;
  const inProgress = myTasks.filter(t => t.status === 'inprogress').length;
  const blocked    = myTasks.filter(t => t.status === 'blocked').length;
  const todo       = myTasks.filter(t => t.status === 'todo').length;
  const completion = myTasks.length > 0 ? Math.round((done / myTasks.length) * 100) : 0;

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const getAvatarColor = (name) => {
    const colors = ['#6D28D9', '#0891B2', '#16A34A', '#DC2626', '#EA580C'];
    const index  = name.length % colors.length;
    return colors[index];
  };

  return (
    <div style={{
      backgroundColor: '#0D1117',
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif',
      color: '#FFFFFF'
    }}>

      <Navbar
        currentPage="profile"
        setCurrentPage={setCurrentPage}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
      />

      <div style={{ padding: '32px', maxWidth: '700px', margin: '0 auto' }}>

        {/* Profile Card */}
        <div style={{
          backgroundColor: '#161B22',
          border: '1px solid #30363D',
          borderRadius: '16px',
          padding: '40px',
          marginBottom: '24px',
          textAlign: 'center'
        }}>
          {/* Avatar */}
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            backgroundColor: getAvatarColor(currentUser),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            fontSize: '28px',
            margin: '0 auto 16px'
          }}>
            {getInitials(currentUser)}
          </div>

          {/* Name */}
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: '0 0 8px 0' }}>
            {currentUser}
          </h1>

          {/* Role badge */}
          <div style={{
            display: 'inline-block',
            backgroundColor: '#1a0533',
            border: '1px solid #6D28D9',
            borderRadius: '999px',
            padding: '4px 16px',
            fontSize: '13px',
            color: '#C4B5FD',
            marginBottom: '24px'
          }}>
            👑 Team Member — Nexora Stride
          </div>

          {/* Divider */}
          <div style={{ borderTop: '1px solid #30363D', paddingTop: '24px' }}>
            <p style={{ color: '#8B949E', fontSize: '14px', margin: '0' }}>
              🌍 Kolhapur, Maharashtra, India
            </p>
          </div>
        </div>

        {/* Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '16px',
          marginBottom: '24px'
        }}>
          {[
            { label: 'Total Tasks',  value: myTasks.length, color: '#8B949E' },
            { label: 'Completed',    value: done,            color: '#16A34A' },
            { label: 'In Progress',  value: inProgress,      color: '#6D28D9' },
            { label: 'Blocked',      value: blocked,         color: '#DC2626' },
          ].map((stat, i) => (
            <div key={i} style={{
              backgroundColor: '#161B22',
              border: '1px solid #30363D',
              borderRadius: '12px',
              padding: '20px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '32px', fontWeight: 'bold', color: stat.color, marginBottom: '4px' }}>
                {stat.value}
              </div>
              <div style={{ color: '#8B949E', fontSize: '13px' }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Completion Bar */}
        <div style={{
          backgroundColor: '#161B22',
          border: '1px solid #30363D',
          borderRadius: '12px',
          padding: '24px',
          marginBottom: '24px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ fontWeight: 'bold' }}>Overall Progress</span>
            <span style={{ color: '#6D28D9', fontWeight: 'bold' }}>{completion}% complete</span>
          </div>
          <div style={{ backgroundColor: '#30363D', borderRadius: '999px', height: '10px' }}>
            <div style={{
              backgroundColor: '#6D28D9',
              width: `${completion}%`,
              height: '100%',
              borderRadius: '999px',
              transition: 'width 0.5s ease'
            }}/>
          </div>
        </div>

        {/* My Recent Tasks */}
        <div style={{
          backgroundColor: '#161B22',
          border: '1px solid #30363D',
          borderRadius: '12px',
          padding: '24px',
          marginBottom: '24px'
        }}>
          <h2 style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 16px 0' }}>
            My Recent Tasks
          </h2>
          {myTasks.length === 0 ? (
            <p style={{ color: '#8B949E', textAlign: 'center', padding: '20px 0' }}>
              No tasks assigned yet.
            </p>
          ) : (
            myTasks.slice(0, 5).map((task, i) => (
              <div key={i} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px 0',
                borderBottom: i < myTasks.slice(0, 5).length - 1 ? '1px solid #30363D' : 'none'
              }}>
                <span style={{ fontSize: '14px' }}>{task.title}</span>
                <span style={{
                  backgroundColor:
                    task.status === 'done'       ? '#16A34A' :
                    task.status === 'inprogress' ? '#6D28D9' :
                    task.status === 'blocked'    ? '#DC2626' : '#8B949E',
                  color: '#FFFFFF',
                  padding: '3px 10px',
                  borderRadius: '999px',
                  fontSize: '11px',
                  fontWeight: 'bold'
                }}>
                  {task.status === 'done'       ? 'Done' :
                   task.status === 'inprogress' ? 'In Progress' :
                   task.status === 'blocked'    ? 'Blocked' : 'To Do'}
                </span>
              </div>
            ))
          )}
        </div>

        {/* Logout Button */}
        <button
          onClick={setCurrentUser}
          style={{
            width: '100%',
            backgroundColor: 'transparent',
            border: '1px solid #DC2626',
            color: '#DC2626',
            borderRadius: '10px',
            padding: '14px',
            fontSize: '15px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}>
          🚪 Log Out
        </button>

      </div>
    </div>
  );
}

export default Profile;