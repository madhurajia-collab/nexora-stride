import React from 'react';
import Navbar from './Navbar';

function TeamView({ setCurrentPage, currentUser, setCurrentUser, tasks, addTask, deleteTask, moveTask }) {

  const members = [
    { name: "Madhura Kulkarni", role: "Engineering Manager", avatar: "MK", color: "#6D28D9", commits: 18 },
    { name: "Rahul", role: "Frontend Developer",  avatar: "RS", color: "#0891B2", commits: 23 },
    { name: "Priya", role: "Backend Developer",   avatar: "PP", color: "#16A34A", commits: 31 },
    { name: "Amit",  role: "Full Stack Developer",avatar: "AS", color: "#DC2626", commits: 8  },
    { name: "Sara",  role: "UI/UX Designer",      avatar: "SK", color: "#EA580C", commits: 12 },
  ];

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

  // ── Team-wide stats from real tasks ──
  const totalCommits   = members.reduce((sum, m) => sum + m.commits, 0);
  const totalCompleted = tasks.filter(t => t.status === 'done').length;
  const blockedMembers = members.filter(m =>
    tasks.some(t => t.assignee === m.name && t.status === 'blocked')
  ).length;

  return (
    <div style={{
      backgroundColor: '#0D1117',
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif',
      color: '#FFFFFF'
    }}>

      <Navbar
        currentPage="team"
        setCurrentPage={setCurrentPage}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
      />

      <div style={{ padding: '32px' }}>

        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: '0 0 8px 0' }}>Team View</h1>
          <p style={{ color: '#8B949E', margin: '0' }}>
            Sprint 12 · {members.length} members · 6 days remaining
          </p>
        </div>

        {/* Team Stats — real data */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '16px',
          marginBottom: '32px'
        }}>
          {[
            { label: 'Team Members',    value: members.length,  color: '#8B949E' },
            { label: 'Total Commits',   value: totalCommits,    color: '#6D28D9' },
            { label: 'Tasks Completed', value: totalCompleted,  color: '#16A34A' },
            { label: 'Blocked Members', value: blockedMembers,  color: '#DC2626' },
          ].map((stat, i) => (
            <div key={i} style={{
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

        {/* Member Cards — real task data */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '16px'
        }}>
          {members.map(member => {
            const memberTasks   = tasks.filter(t => t.assignee === member.name);
            const doneTasks     = memberTasks.filter(t => t.status === 'done');
            const inProgTasks   = memberTasks.filter(t => t.status === 'inprogress');
            const isBlocked     = memberTasks.some(t => t.status === 'blocked');
            const workloadPct   = memberTasks.length > 0
              ? Math.round((doneTasks.length / memberTasks.length) * 100)
              : 0;

            return (
              <div key={member.name} style={{
                backgroundColor: '#161B22',
                border: `1px solid ${isBlocked ? '#DC2626' : '#30363D'}`,
                borderRadius: '12px',
                padding: '24px'
              }}>

                {/* Member Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
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
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '4px' }}>
                      {member.name === 'You' ? `${member.name} (Manager)` : member.name}
                    </div>
                    <div style={{ color: '#8B949E', fontSize: '13px' }}>{member.role}</div>
                  </div>
                  <div style={{
                    backgroundColor: isBlocked ? '#DC2626' : '#16A34A',
                    color: '#FFFFFF',
                    padding: '4px 10px',
                    borderRadius: '999px',
                    fontSize: '11px',
                    fontWeight: 'bold'
                  }}>
                    {isBlocked ? '⚠ Blocked' : '● Active'}
                  </div>
                </div>

                {/* Stats */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '8px',
                  marginBottom: '16px'
                }}>
                  {[
                    { label: 'Tasks Done',   value: `${doneTasks.length}/${memberTasks.length}` },
                    { label: 'In Progress',  value: inProgTasks.length },
                    { label: 'Commits',      value: member.commits },
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
                    <span style={{ fontSize: '12px', color: '#8B949E' }}>{workloadPct}% complete</span>
                  </div>
                  <div style={{ backgroundColor: '#30363D', borderRadius: '999px', height: '6px' }}>
                    <div style={{
                      backgroundColor: member.color,
                      width: `${workloadPct}%`,
                      height: '100%',
                      borderRadius: '999px',
                      transition: 'width 0.5s ease'
                    }}/>
                  </div>
                </div>

                {/* Recent Tasks */}
                {memberTasks.length > 0 ? (
                  <div>
                    <div style={{ fontSize: '12px', color: '#8B949E', marginBottom: '8px' }}>
                      Recent Tasks
                    </div>
                    {memberTasks.slice(0, 3).map((task, i) => (
                      <div key={i} style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '6px 0',
                        borderBottom: i < Math.min(memberTasks.length, 3) - 1 ? '1px solid #30363D' : 'none'
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
                ) : (
                  <div style={{ color: '#8B949E', fontSize: '13px', textAlign: 'center', padding: '8px 0' }}>
                    No tasks assigned yet
                  </div>
                )}

              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default TeamView;