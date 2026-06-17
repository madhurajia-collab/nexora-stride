import React, { useState } from 'react';
import Dashboard from './Dashboard';
import SprintBoard from './SprintBoard';
import TeamView from './TeamView';
import Reports from './Reports';
import MyTasks from './MyTasks';

const initialTasks = [
  { id: 1, title: "Setup auth module",   assignee: "Rahul", status: "done",       priority: "high" },
  { id: 2, title: "Build API endpoints", assignee: "Priya", status: "inprogress", priority: "high" },
  { id: 3, title: "Fix payment bug",     assignee: "Amit",  status: "blocked",    priority: "critical" },
  { id: 4, title: "Design dashboard UI", assignee: "Sara",  status: "done",       priority: "medium" },
  { id: 5, title: "Write unit tests",    assignee: "Rahul", status: "inprogress", priority: "medium" },
  { id: 6, title: "Setup database",      assignee: "Priya", status: "todo",       priority: "high" },
  { id: 7, title: "Deploy to staging",   assignee: "Amit",  status: "todo",       priority: "low" },
  { id: 8, title: "Code review",         assignee: "Sara",  status: "todo",       priority: "medium" },
  { id: 9, title: "Review sprint plan",  assignee: "You",   status: "todo",       priority: "high" },
];

const users = ["You", "Rahul", "Priya", "Amit", "Sara"];

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('mytasks');
  const [tasks, setTasks] = useState(initialTasks);

  const moveTask = (taskId, newStatus) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
  };

  const addTask = (newTask) => {
    const task = {
      ...newTask,
      id: Date.now()
    };
    setTasks([...tasks, task]);
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  // ── LOGIN SCREEN ──────────────────────────────────────────
  if (!currentUser) {
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
          width: '420px'
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
            marginBottom: '32px'
          }}>
            Who's logging in?
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {users.map(user => (
              <button
                key={user}
                onClick={() => setCurrentUser(user)}
                style={{
                  backgroundColor: user === 'You' ? '#6D28D9' : '#0D1117',
                  border: user === 'You' ? 'none' : '1px solid #30363D',
                  color: '#FFFFFF',
                  borderRadius: '8px',
                  padding: '14px',
                  fontSize: '15px',
                  fontWeight: user === 'You' ? 'bold' : 'normal',
                  cursor: 'pointer',
                  textAlign: 'left',
                  paddingLeft: '20px'
                }}>
                {user === 'You' ? '👑 You — Manager' : `👤 ${user}`}
              </button>
            ))}
          </div>

          <p style={{
            color: '#30363D',
            fontSize: '12px',
            margin: '32px 0 0 0'
          }}>
            Track. Predict. Deliver.
          </p>
        </div>
      </div>
    );
  }
  <p style={{
  color: '#30363D',
  fontSize: '12px',
  margin: '32px 0 0 0'
}}>
  Track. Predict. Deliver.
</p>

  // ── MAIN APP ──────────────────────────────────────────────
  const commonProps = {
    setCurrentPage,
    currentUser,
    setCurrentUser,
    tasks,
    moveTask,
    addTask,
    deleteTask
  };

  if (currentPage === 'sprintboard') return <SprintBoard {...commonProps} />;
  if (currentPage === 'team')        return <TeamView {...commonProps} />;
  if (currentPage === 'reports')     return <Reports {...commonProps} />;
  if (currentPage === 'mytasks')     return <MyTasks {...commonProps} />;
  return <Dashboard {...commonProps} />;
}

export default App;