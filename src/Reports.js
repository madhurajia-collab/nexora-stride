import React from 'react';

function Reports({ setCurrentPage }) {
  const weeklyData = [
    { day: 'Mon', completed: 3, planned: 4 },
    { day: 'Tue', completed: 5, planned: 5 },
    { day: 'Wed', completed: 2, planned: 4 },
    { day: 'Thu', completed: 6, planned: 5 },
    { day: 'Fri', completed: 4, planned: 4 },
    { day: 'Sat', completed: 2, planned: 3 },
    { day: 'Sun', completed: 1, planned: 2 },
  ];

  const maxValue = 8;

  return (
    <div style={{
      backgroundColor: '#0D1117',
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif',
      color: '#FFFFFF'
    }}>

      {/* Navbar */}
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
          <span onClick={() => setCurrentPage('dashboard')} style={{ color: '#8B949E', fontSize: '13px', cursor: 'pointer' }}>Dashboard</span>
          <span onClick={() => setCurrentPage('sprintboard')} style={{ color: '#8B949E', fontSize: '13px', cursor: 'pointer' }}>Sprint Board</span>
          <span onClick={() => setCurrentPage('team')} style={{ color: '#8B949E', fontSize: '13px', cursor: 'pointer' }}>Team</span>
          <span style={{ color: '#6D28D9', fontSize: '13px', fontWeight: 'bold' }}>Reports</span>
          <div style={{ backgroundColor: '#6D28D9', borderRadius: '20px', padding: '4px 12px', fontSize: '13px' }}>
            👤 John's Team
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '32px' }}>

        {/* Header */}
        <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: '0 0 8px 0' }}>Reports</h1>
            <p style={{ color: '#8B949E', margin: '0' }}>Sprint 12 · May 28 – Jun 10, 2026</p>
          </div>
          <button style={{
            backgroundColor: '#6D28D9',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '8px',
            padding: '10px 20px',
            fontSize: '14px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}>
            Export PDF
          </button>
        </div>

        {/* Summary Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '16px',
          marginBottom: '32px'
        }}>
          {[
            { label: 'Sprint Velocity', value: '23', sub: 'tasks/sprint', color: '#6D28D9' },
            { label: 'Completion Rate', value: '73%', sub: 'on track', color: '#16A34A' },
            { label: 'Avg Cycle Time', value: '2.4', sub: 'days/task', color: '#0891B2' },
            { label: 'Blocked Rate', value: '15%', sub: 'tasks blocked', color: '#DC2626' },
          ].map((stat, i) => (
            <div key={i} style={{
              backgroundColor: '#161B22',
              border: '1px solid #30363D',
              borderRadius: '12px',
              padding: '20px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '36px', fontWeight: 'bold', color: stat.color, marginBottom: '4px' }}>
                {stat.value}
              </div>
              <div style={{ color: '#FFFFFF', fontSize: '14px', fontWeight: 'bold', marginBottom: '4px' }}>
                {stat.label}
              </div>
              <div style={{ color: '#8B949E', fontSize: '12px' }}>{stat.sub}</div>
            </div>
          ))}
        </div>

        {/* Velocity Chart */}
        <div style={{
          backgroundColor: '#161B22',
          border: '1px solid #30363D',
          borderRadius: '12px',
          padding: '24px',
          marginBottom: '32px'
        }}>
          <h2 style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 8px 0' }}>
            Weekly Velocity Chart
          </h2>
          <p style={{ color: '#8B949E', fontSize: '13px', margin: '0 0 24px 0' }}>
            Planned vs Completed tasks per day
          </p>

          {/* Chart */}
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '16px', height: '200px', padding: '0 16px' }}>
            {weeklyData.map((day, i) => (
              <div key={i} style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
                height: '100%',
                justifyContent: 'flex-end'
              }}>
                {/* Bars */}
                <div style={{ display: 'flex', gap: '4px', alignItems: 'flex-end', width: '100%', justifyContent: 'center' }}>
                  {/* Planned bar */}
                  <div style={{
                    width: '16px',
                    height: `${(day.planned / maxValue) * 160}px`,
                    backgroundColor: '#30363D',
                    borderRadius: '4px 4px 0 0'
                  }}/>
                  {/* Completed bar */}
                  <div style={{
                    width: '16px',
                    height: `${(day.completed / maxValue) * 160}px`,
                    backgroundColor: '#6D28D9',
                    borderRadius: '4px 4px 0 0'
                  }}/>
                </div>
                {/* Day label */}
                <div style={{ color: '#8B949E', fontSize: '12px', marginTop: '8px' }}>{day.day}</div>
              </div>
            ))}
          </div>

          {/* Legend */}
          <div style={{ display: 'flex', gap: '24px', marginTop: '16px', justifyContent: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '12px', height: '12px', backgroundColor: '#30363D', borderRadius: '2px' }}/>
              <span style={{ color: '#8B949E', fontSize: '13px' }}>Planned</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '12px', height: '12px', backgroundColor: '#6D28D9', borderRadius: '2px' }}/>
              <span style={{ color: '#8B949E', fontSize: '13px' }}>Completed</span>
            </div>
          </div>
        </div>

        {/* AI Weekly Digest */}
        <div style={{
          backgroundColor: '#161B22',
          border: '1px solid #6D28D9',
          borderRadius: '12px',
          padding: '24px',
          marginBottom: '32px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div style={{
              backgroundColor: '#6D28D9',
              borderRadius: '8px',
              padding: '6px 12px',
              fontSize: '12px',
              fontWeight: 'bold'
            }}>
              ✨ AI Generated
            </div>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', margin: '0' }}>Weekly Digest</h2>
          </div>
          <p style={{ color: '#D1D5DB', fontSize: '15px', lineHeight: '1.8', margin: '0 0 16px 0' }}>
            This week the team completed <strong style={{ color: '#FFFFFF' }}>23 tasks</strong> across
            Sprint 12, maintaining a velocity of <strong style={{ color: '#FFFFFF' }}>73% on track</strong>.
            Rahul and Sara showed the strongest output with 23 and 12 commits respectively.
          </p>
          <p style={{ color: '#D1D5DB', fontSize: '15px', lineHeight: '1.8', margin: '0 0 16px 0' }}>
            ⚠️ <strong style={{ color: '#FCA5A5' }}>Risk Alert:</strong> The payment bug assigned to Amit
            has been blocked for <strong style={{ color: '#FFFFFF' }}>3 days</strong> with no activity.
            This is on the critical path and may delay the sprint delivery.
          </p>
          <p style={{ color: '#D1D5DB', fontSize: '15px', lineHeight: '1.8', margin: '0' }}>
            💡 <strong style={{ color: '#86EFAC' }}>Recommendation:</strong> Consider reassigning the
            payment bug or pairing Amit with Priya to unblock progress before the sprint deadline.
          </p>
        </div>

        {/* Sprint Completion Forecast */}
        <div style={{
          backgroundColor: '#161B22',
          border: '1px solid #30363D',
          borderRadius: '12px',
          padding: '24px'
        }}>
          <h2 style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 20px 0' }}>
            Sprint Completion Forecast
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
            {/* Big percentage */}
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '72px', fontWeight: 'bold', color: '#16A34A', lineHeight: '1' }}>
                73%
              </div>
              <div style={{ color: '#8B949E', fontSize: '14px', marginTop: '8px' }}>
                Probability of on-time delivery
              </div>
            </div>

            {/* Forecast details */}
            <div style={{ flex: 1 }}>
              {[
                { label: 'Tasks remaining', value: '8 tasks', color: '#8B949E' },
                { label: 'Days remaining', value: '6 days', color: '#8B949E' },
                { label: 'Required daily velocity', value: '1.3 tasks/day', color: '#6D28D9' },
                { label: 'Current daily velocity', value: '1.1 tasks/day', color: '#EA580C' },
                { label: 'Forecast status', value: 'Slightly at risk', color: '#EA580C' },
              ].map((item, i) => (
                <div key={i} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '10px 0',
                  borderBottom: i < 4 ? '1px solid #30363D' : 'none'
                }}>
                  <span style={{ color: '#8B949E', fontSize: '14px' }}>{item.label}</span>
                  <span style={{ color: item.color, fontWeight: 'bold', fontSize: '14px' }}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Reports;