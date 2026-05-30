import React from 'react';

function Dashboard({ setCurrentPage }) {
  const tasks = [
    { id: 1, title: "Setup auth module", assignee: "Rahul", status: "done" },
    { id: 2, title: "Build API endpoints", assignee: "Priya", status: "inprogress" },
    { id: 3, title: "Fix payment bug", assignee: "Amit", status: "blocked" },
    { id: 4, title: "Design dashboard UI", assignee: "Sara", status: "done" },
    { id: 5, title: "Write unit tests", assignee: "Rahul", status: "inprogress" },
  ];

  const getStatusIcon = (status) => {
    if (status === "done") return "✅";
    if (status === "inprogress") return "🔄";
    if (status === "blocked") return "🚫";
  };

  const getStatusColor = (status) => {
    if (status === "done") return "#16A34A";
    if (status === "inprogress") return "#6D28D9";
    if (status === "blocked") return "#DC2626";
  };

  return (
    <div style={{
      backgroundColor: '#0D1117',
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif',
      color: '#FFFFFF'
    }}>

      {/* Top Navigation Bar */}
      <div style={{
        backgroundColor: '#161B22',
        borderBottom: '1px solid #30363D',
        padding: '16px 32px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ color: '#6D28D9', fontWeight: 'bold', fontSize: '12px', letterSpacing: '2px' }}>NEXORA</span>
          <span style={{ color: '#FFFFFF', fontWeight: 'bold', fontSize: '20px' }}>Stride</span>
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
  <span
    onClick={() => setCurrentPage('dashboard')}
    style={{ color: '#8B949E', fontSize: '13px', cursor: 'pointer' }}>
    Dashboard
  </span>
  <span
    onClick={() => setCurrentPage('sprintboard')}
    style={{ color: '#6D28D9', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}>
    Sprint Board
  </span>
  <span style={{ color: '#8B949E', fontSize: '13px', cursor: 'pointer' }}>
    Team
  </span><span
  onClick={() => setCurrentPage('reports')}
  style={{ color: '#8B949E', fontSize: '13px', cursor: 'pointer' }}>
  Reports
</span>
</div><div style={{
          backgroundColor: '#6D28D9',
          borderRadius: '20px',
          padding: '6px 16px',
          fontSize: '14px'
        }}>
          👤 John's Team
        </div>
      </div>

      {/* Main Content */}
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

        {/* Stats Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '16px',
          marginBottom: '32px'
        }}>
          {[
            { label: 'Total Tasks', value: '20', color: '#8B949E' },
            { label: 'Completed', value: '12', color: '#16A34A' },
            { label: 'In Progress', value: '5', color: '#6D28D9' },
            { label: 'Blocked', value: '3', color: '#DC2626' },
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

        {/* Sprint Health Bar */}
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
            <span style={{ color: '#16A34A', fontWeight: 'bold' }}>73% On Track ✅</span>
          </div>
          <div style={{
            backgroundColor: '#30363D',
            borderRadius: '999px',
            height: '12px',
            overflow: 'hidden'
          }}>
            <div style={{
              backgroundColor: '#16A34A',
              width: '73%',
              height: '100%',
              borderRadius: '999px'
            }}/>
          </div>
        </div>

        {/* Recent Tasks */}
        <div style={{
          backgroundColor: '#161B22',
          border: '1px solid #30363D',
          borderRadius: '12px',
          padding: '24px'
        }}>
          <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px', margin: '0 0 20px 0' }}>
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
                  {task.status === 'done' ? 'Done' : task.status === 'inprogress' ? 'In Progress' : 'Blocked'}
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