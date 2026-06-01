import React, { useState } from 'react';
import Dashboard from './Dashboard';
import SprintBoard from './SprintBoard';
import TeamView from './TeamView';
import Reports from './Reports';

const initialTasks = [
  { id: 1, title: "Setup auth module",   assignee: "Rahul", status: "done",       priority: "high" },
  { id: 2, title: "Build API endpoints", assignee: "Priya", status: "inprogress", priority: "high" },
  { id: 3, title: "Fix payment bug",     assignee: "Amit",  status: "blocked",    priority: "critical" },
  { id: 4, title: "Design dashboard UI", assignee: "Sara",  status: "done",       priority: "medium" },
  { id: 5, title: "Write unit tests",    assignee: "Rahul", status: "inprogress", priority: "medium" },
  { id: 6, title: "Setup database",      assignee: "Priya", status: "todo",       priority: "high" },
  { id: 7, title: "Deploy to staging",   assignee: "Amit",  status: "todo",       priority: "low" },
  { id: 8, title: "Code review",         assignee: "Sara",  status: "todo",       priority: "medium" },
];

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [tasks, setTasks] = useState(initialTasks);

  const moveTask = (taskId, newStatus) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
  };

  const addTask = (newTask) => {
    const task = {
      ...newTask,
      id: tasks.length + 1
    };
    setTasks([...tasks, task]);
  };

  if (loggedIn) {
    if (currentPage === 'sprintboard') {
      return <SprintBoard setCurrentPage={setCurrentPage} tasks={tasks} moveTask={moveTask} addTask={addTask} />;
    }
    if (currentPage === 'team') {
      return <TeamView setCurrentPage={setCurrentPage} tasks={tasks} />;
    }
    if (currentPage === 'reports') {
      return <Reports setCurrentPage={setCurrentPage} tasks={tasks} />;
    }
    return <Dashboard setCurrentPage={setCurrentPage} tasks={tasks} />;
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