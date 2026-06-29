import React, { useState } from 'react';
import Dashboard from './Dashboard';
import SprintBoard from './SprintBoard';
import TeamView from './TeamView';
import Reports from './Reports';
import MyTasks from './MyTasks';
import Login from './Login';
import Signup from './Signup';
import LandingPage from './LandingPage';

const initialTasks = [
  { id: 1,  title: "Setup auth module",    assignee: "Madhura Kulkarni", status: "todo",       priority: "high" },
  { id: 2,  title: "Build API endpoints",  assignee: "Rahul",            status: "inprogress", priority: "high" },
  { id: 3,  title: "Fix payment bug",      assignee: "Amit",             status: "blocked",    priority: "critical" },
  { id: 4,  title: "Design dashboard UI",  assignee: "Sara",             status: "done",       priority: "medium" },
  { id: 5,  title: "Write unit tests",     assignee: "Rahul",            status: "inprogress", priority: "medium" },
  { id: 6,  title: "Setup database",       assignee: "Priya",            status: "todo",       priority: "high" },
  { id: 7,  title: "Deploy to staging",    assignee: "Amit",             status: "todo",       priority: "low" },
  { id: 8,  title: "Code review",          assignee: "Sara",             status: "todo",       priority: "medium" },
  { id: 9,  title: "Review sprint plan",   assignee: "Madhura Kulkarni", status: "todo",       priority: "high" },
  { id: 10, title: "Team standup prep",    assignee: "Madhura Kulkarni", status: "todo",       priority: "medium" },
  { id: 11, title: "Sprint retrospective", assignee: "Madhura Kulkarni", status: "todo",       priority: "low" },
];

function App() {
  const [currentUser, setCurrentUser]   = useState(null);
  const [authScreen, setAuthScreen]     = useState('landing');
  const [currentPage, setCurrentPage]   = useState('mytasks');
  const [tasks, setTasks]               = useState(initialTasks);

  const moveTask = (taskId, newStatus) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
  };

  const addTask = (newTask) => {
    const task = { ...newTask, id: Date.now() };
    setTasks([...tasks, task]);
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const handleLogin = (user) => {
    setCurrentUser(user);
    setCurrentPage('mytasks');
  };

  const handleSignup = (user) => {
    setCurrentUser(user);
    setCurrentPage('mytasks');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setAuthScreen('landing');
    setCurrentPage('mytasks');
  };

  // ── Not logged in ──
  if (!currentUser) {
    if (authScreen === 'landing') {
      return <LandingPage onGetStarted={(screen) => setAuthScreen(screen)} />;
    }
    if (authScreen === 'signup') {
      return (
        <Signup
          onSignup={handleSignup}
          onGoToLogin={() => setAuthScreen('login')}
        />
      );
    }
    return (
      <Login
        onLogin={handleLogin}
        onGoToSignup={() => setAuthScreen('signup')}
      />
    );
  }

  // ── Logged in ──
  const commonProps = {
    setCurrentPage,
    currentUser: currentUser.name,
    setCurrentUser: handleLogout,
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