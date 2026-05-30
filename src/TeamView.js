import React from 'react';

function TeamView({ setCurrentPage }) {
  const members = [
    {
      id: 1,
      name: "Rahul Sharma",
      role: "Frontend Developer",
      avatar: "RS",
      color: "#6D28D9",
      tasksTotal: 6,
      tasksDone: 4,
      inProgress: 2,
      commits: 23,
      lastActive: "2 hours ago",
      status: "active",
      tasks: [
        { title: "Setup auth module", status: "done" },
        { title: "Write unit tests", status: "inprogress" },
        { title: "Fix login bug", status: "done" },
      ]
    },
    {
      id: 2,
      name: "Priya Patel",
      role: "Backend Developer",
      avatar: "PP",
      color: "#0891B2",
      tasksTotal: 5,
      tasksDone: 3,
      inProgress: 2,
      commits: 31,
      lastActive: "30 mins ago",
      status: "active",
      tasks: [
        { title: "Build API endpoints", status: "inprogress" },
        { title: "Setup database", status: "done" },
        { title: "Write API docs", status: "done" },
      ]
    },
    {
      id: 3,
      name: "Amit Singh",
      role: "Full Stack Developer",
      avatar: "AS",
      color: "#DC2626",
      tasksTotal: 4,
      tasksDone: 1,
      inProgress: 1,
      commits: 8,
      lastActive: "1 day ago",
      status: "blocked",
      tasks: [
        { title: "Fix payment bug", status: "blocked" },
        { title: "Deploy to staging", status: "todo" },
      ]
    },
    {
      id: 4,
      name: "Sara Khan",
      role: "UI/UX Designer",
      avatar: "SK",
      color: "#16A34A",
      tasksTotal: 5,
      tasksDone: 4,
      inProgress: 1,
      commits: 12,
      lastActive: "1 hour ago",
      status: "active",
      tasks: [
        { title: "Design dashboard UI", status: "done" },
        { title: "Code review", status: "inprogress" },
        { title: "Design mobile view", status: "done" },
      ]
    },
  ];

  const getStatusColor = (status) => {
    if (status === "done") return "#16A34A";
    if (status === "inprogress") return "#6D28D9";
    if (status === "blocked") return "#DC2626";
    if (status === "todo") return "#8B949E";
  };

  const getStatusLabel = (status) => {
    if (status === "done") return "Done";
    if (status === "inprogress") return "In Progress";
    if (status === "blocked") return "Blocked";
    if (status === "todo") return "To Do";
  };

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
          <span
            onClick={() => setCurrentPage('dashboard')}
            style={{ color: '#8B949E', fontSize: '13px', cursor: 'pointer' }}>
            Dashboard
          </span>
          <span
            onClick={() => setCurrentPage('sprintboard')}
            style={{ color: '#8B949E', fontSize: '13px', cursor: 'pointer' }}>
            Sprint Board
          </span>
          <span
            style={{ color: '#6D28D9', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}>
            Team
          </span>
          <div style={{ backgroundColor: '#6D28D9', borderRadius: '20px', padding: '4px 12px', fontSize: '13px' }}>
            👤 John's Team
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '32px' }}>

        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: '0 0 8px 0' }}>Team View</h1>
          <p style={{ color: '#8B949E', margin: '0' }}>Sprint 12 · 4 members · 6 days remaining</p>
        </div>

        {/* Team Stats Row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '16px',
          marginBottom: '32px'
        }}>
          {[
            { label: 'Team Members', value: '4', color: '#8B949E' },
            { label: 'Total Commits', value: '74', color: '#6D28D9' },
            { label: 'Tasks Completed', value: '12', color: '#16A34A' },
            { label: 'Blocked Members', value: '1', color: '#DC2626' },
          ].map((stat, index) => (
            <div key={index} style={{
              backgroundColor: '#161B22',
              border: '1px solid #30363D',
              borderRadius: '12px',
              padding: '20px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '36px', fontWeight: 'bold', color: stat.color, marginBottom: '8px' }}>
                {stat.value}
              </div>
              <div style={{ color: '#8B949E', fontSize: '13px' }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Team Members Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '16px'
        }}>
          {members.map(member => (
            <div key={member.id} style={{
              backgroundColor: '#161B22',
              border: `1px solid ${member.status === 'blocked' ? '#DC2626' : '#30363D'}`,
              borderRadius: '12px',
              padding: '24px'
            }}>

              {/* Member Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                {/* Avatar */}
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  backgroundColor: member.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  fontSize: '16px',
                  flexShrink: 0
                }}>
                  {member.avatar}
                </div>

                {/* Name & Role */}
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '4px' }}>
                    {member.name}
                  </div>
                  <div style={{ color: '#8B949E', fontSize: '13px' }}>
                    {member.role}
                  </div>
                </div>

                {/* Status Badge */}
                <div style={{
                  backgroundColor: member.status === 'active' ? '#16A34A' : '#DC2626',
                  color: '#FFFFFF',
                  padding: '4px 10px',
                  borderRadius: '999px',
                  fontSize: '11px',
                  fontWeight: 'bold'
                }}>
                  {member.status === 'active' ? '● Active' : '⚠ Blocked'}
                </div>
              </div>

              {/* Stats Row */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '8px',
                marginBottom: '20px'
              }}>
                {[
                  { label: 'Tasks Done', value: `${member.tasksDone}/${member.tasksTotal}` },
                  { label: 'In Progress', value: member.inProgress },
                  { label: 'Commits', value: member.commits },
                ].map((stat, i) => (
                  <div key={i} style={{
                    backgroundColor: '#0D1117',
                    borderRadius: '8px',
                    padding: '10px',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontWeight: 'bold', fontSize: '18px', color: member.color }}>
                      {stat.value}
                    </div>
                    <div style={{ color: '#8B949E', fontSize: '11px' }}>{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Workload Bar */}
              <div style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontSize: '12px', color: '#8B949E' }}>Workload</span>
                  <span style={{ fontSize: '12px', color: '#8B949E' }}>
                    {Math.round((member.tasksDone / member.tasksTotal) * 100)}% complete
                  </span>
                </div>
                <div style={{ backgroundColor: '#30363D', borderRadius: '999px', height: '6px' }}>
                  <div style={{
                    backgroundColor: member.color,
                    width: `${(member.tasksDone / member.tasksTotal) * 100}%`,
                    height: '100%',
                    borderRadius: '999px'
                  }}/>
                </div>
              </div>

              {/* Recent Tasks */}
              <div>
                <div style={{ fontSize: '12px', color: '#8B949E', marginBottom: '8px' }}>Recent Tasks</div>
                {member.tasks.map((task, i) => (
                  <div key={i} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '6px 0',
                    borderBottom: i < member.tasks.length - 1 ? '1px solid #30363D' : 'none'
                  }}>
                    <span style={{ fontSize: '13px' }}>{task.title}</span>
                    <span style={{
                      backgroundColor: getStatusColor(task.status),
                      color: '#FFFFFF',
                      padding: '2px 8px',
                      borderRadius: '999px',
                      fontSize: '10px',
                      fontWeight: 'bold'
                    }}>
                      {getStatusLabel(task.status)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Last Active */}
              <div style={{ marginTop: '12px', color: '#8B949E', fontSize: '12px' }}>
                🕐 Last active: {member.lastActive}
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TeamView;