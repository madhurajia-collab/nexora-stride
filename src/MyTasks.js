import React, { useState } from 'react';
import Navbar from './Navbar';

function MyTasks({ setCurrentPage, currentUser, setCurrentUser, tasks, moveTask, addTask, deleteTask }) {

  const [showForm, setShowForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newPriority, setNewPriority] = useState('medium');

  const myTasks = tasks.filter(t => t.assignee === currentUser);

  const handleAddTask = () => {
    if (newTitle.trim() === '') return;
    addTask({
      title: newTitle,
      assignee: currentUser,
      priority: newPriority,
      status: 'todo'
    });
    setNewTitle('');
    setNewPriority('medium');
    setShowForm(false);
  };

  const getPriorityColor = (priority) => {
    if (priority === 'critical') return '#DC2626';
    if (priority === 'high')     return '#EA580C';
    if (priority === 'medium')   return '#6D28D9';
    if (priority === 'low')      return '#16A34A';
  };

  const getStatusColor = (status) => {
    if (status === 'todo')       return '#8B949E';
    if (status === 'inprogress') return '#6D28D9';
    if (status === 'blocked')    return '#DC2626';
    if (status === 'done')       return '#16A34A';
  };

  const getStatusLabel = (status) => {
    if (status === 'todo')       return 'To Do';
    if (status === 'inprogress') return 'In Progress';
    if (status === 'blocked')    return 'Blocked';
    if (status === 'done')       return 'Done';
  };

  const getNextStatus = (currentStatus) => {
    if (currentStatus === 'todo')       return 'inprogress';
    if (currentStatus === 'inprogress') return 'done';
    if (currentStatus === 'blocked')    return 'done';
    return 'done';
  };

  const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
  const sortedTasks = [...myTasks].sort((a, b) => {
    if (a.status === 'done' && b.status !== 'done') return 1;
    if (a.status !== 'done' && b.status === 'done') return -1;
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  const todoCount = myTasks.filter(t => t.status !== 'done').length;
  const doneCount = myTasks.filter(t => t.status === 'done').length;

  return (
    <div style={{
      backgroundColor: '#0D1117',
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif',
      color: '#FFFFFF'
    }}>

      <Navbar
        currentPage="mytasks"
        setCurrentPage={setCurrentPage}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
      />

      <div style={{ padding: '32px', maxWidth: '700px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{
          marginBottom: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: '0 0 8px 0' }}>
              👋 Hey {currentUser}
            </h1>
            <p style={{ color: '#8B949E', margin: '0' }}>
              {todoCount} tasks to do · {doneCount} completed
            </p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            style={{
              backgroundColor: '#6D28D9',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '8px',
              padding: '10px 20px',
              fontSize: '14px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}>
            + Add Task
          </button>
        </div>

        {/* Add Task Popup */}
        {showForm && (
          <div style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}>
            <div style={{
              backgroundColor: '#161B22',
              border: '1px solid #30363D',
              borderRadius: '16px',
              padding: '32px',
              width: '400px'
            }}>
              <h2 style={{ margin: '0 0 24px 0', fontSize: '20px' }}>
                Add Task for {currentUser}
              </h2>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', color: '#8B949E', fontSize: '13px', marginBottom: '6px' }}>
                  Task Title *
                </label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Review pull request"
                  style={{
                    width: '100%',
                    backgroundColor: '#0D1117',
                    border: '1px solid #30363D',
                    borderRadius: '8px',
                    padding: '10px 12px',
                    color: '#FFFFFF',
                    fontSize: '14px',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', color: '#8B949E', fontSize: '13px', marginBottom: '6px' }}>
                  Priority
                </label>
                <select
                  value={newPriority}
                  onChange={(e) => setNewPriority(e.target.value)}
                  style={{
                    width: '100%',
                    backgroundColor: '#0D1117',
                    border: '1px solid #30363D',
                    borderRadius: '8px',
                    padding: '10px 12px',
                    color: '#FFFFFF',
                    fontSize: '14px',
                    boxSizing: 'border-box'
                  }}>
                  <option value="critical">Critical</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  onClick={handleAddTask}
                  style={{
                    flex: 1,
                    backgroundColor: '#6D28D9',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '12px',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}>
                  Add Task
                </button>
                <button
                  onClick={() => setShowForm(false)}
                  style={{
                    flex: 1,
                    backgroundColor: '#30363D',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '12px',
                    fontSize: '14px',
                    cursor: 'pointer'
                  }}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {sortedTasks.length === 0 && (
          <div style={{
            backgroundColor: '#161B22',
            border: '1px solid #30363D',
            borderRadius: '12px',
            padding: '40px',
            textAlign: 'center',
            color: '#8B949E'
          }}>
            No tasks yet. Click + Add Task to create one.
          </div>
        )}

        {/* Task List */}
        {sortedTasks.map(task => (
          <div key={task.id} style={{
            backgroundColor: '#161B22',
            border: '1px solid #30363D',
            borderRadius: '12px',
            padding: '16px',
            marginBottom: '12px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            opacity: task.status === 'done' ? 0.5 : 1
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1 }}>
              <div style={{
                backgroundColor: getPriorityColor(task.priority),
                color: '#FFFFFF',
                padding: '3px 10px',
                borderRadius: '999px',
                fontSize: '10px',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                flexShrink: 0
              }}>
                {task.priority}
              </div>
              <span style={{
                fontSize: '15px',
                textDecoration: task.status === 'done' ? 'line-through' : 'none'
              }}>
                {task.title}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
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

              {task.status !== 'done' && (
                <button
                  onClick={() => moveTask(task.id, getNextStatus(task.status))}
                  style={{
                    backgroundColor: '#6D28D9',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '6px 12px',
                    fontSize: '12px',
                    cursor: 'pointer'
                  }}>
                  Move →
                </button>
              )}

              <button
                onClick={() => deleteTask(task.id)}
                title="Delete task"
                style={{
                  backgroundColor: 'transparent',
                  border: '1px solid #30363D',
                  color: '#DC2626',
                  borderRadius: '6px',
                  padding: '6px 10px',
                  fontSize: '12px',
                  cursor: 'pointer'
                }}>
                🗑
              </button>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}

export default MyTasks;