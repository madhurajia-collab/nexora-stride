import React, { useState } from 'react';
import Navbar from './Navbar';

function SprintBoard({ setCurrentPage, tasks, moveTask, addTask }) {

  const [showForm, setShowForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newAssignee, setNewAssignee] = useState('');
  const [newPriority, setNewPriority] = useState('medium');

  const handleAddTask = () => {
    if (newTitle.trim() === '') return;
    addTask({
      title: newTitle,
      assignee: newAssignee || 'Unassigned',
      priority: newPriority,
      status: 'todo'
    });
    setNewTitle('');
    setNewAssignee('');
    setNewPriority('medium');
    setShowForm(false);
  };

  const columns = [
    { id: 'todo',       label: 'To Do',      color: '#8B949E' },
    { id: 'inprogress', label: 'In Progress', color: '#6D28D9' },
    { id: 'blocked',    label: 'Blocked',     color: '#DC2626' },
    { id: 'done',       label: 'Done',        color: '#16A34A' },
  ];

  const getPriorityColor = (priority) => {
    if (priority === 'critical') return '#DC2626';
    if (priority === 'high')     return '#EA580C';
    if (priority === 'medium')   return '#6D28D9';
    if (priority === 'low')      return '#16A34A';
  };

  const getNextStatus = (currentStatus) => {
    if (currentStatus === 'todo')       return 'inprogress';
    if (currentStatus === 'inprogress') return 'done';
    if (currentStatus === 'blocked')    return 'done';
    return 'done';
  };

  return (
    <div style={{
      backgroundColor: '#0D1117',
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif',
      color: '#FFFFFF'
    }}>

      <Navbar currentPage="sprintboard" setCurrentPage={setCurrentPage} />

      <div style={{ padding: '32px' }}>

        {/* Header */}
        <div style={{
          marginBottom: '32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: '0 0 8px 0' }}>Sprint Board</h1>
            <p style={{ color: '#8B949E', margin: '0' }}>Sprint 12 · 6 days remaining</p>
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

        {/* Add Task Form Popup */}
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
              <h2 style={{ margin: '0 0 24px 0', fontSize: '20px' }}>Add New Task</h2>

              {/* Title */}
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', color: '#8B949E', fontSize: '13px', marginBottom: '6px' }}>
                  Task Title *
                </label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Fix login bug"
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

              {/* Assignee */}
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', color: '#8B949E', fontSize: '13px', marginBottom: '6px' }}>
                  Assignee
                </label>
                <input
                  type="text"
                  value={newAssignee}
                  onChange={(e) => setNewAssignee(e.target.value)}
                  placeholder="e.g. Rahul"
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

              {/* Priority */}
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

              {/* Buttons */}
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

        {/* Kanban Board */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '16px'
        }}>
          {columns.map(column => (
            <div key={column.id} style={{
              backgroundColor: '#161B22',
              border: '1px solid #30363D',
              borderRadius: '12px',
              padding: '16px'
            }}>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '16px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    backgroundColor: column.color
                  }}/>
                  <span style={{ fontWeight: 'bold', fontSize: '14px' }}>{column.label}</span>
                </div>
                <span style={{
                  backgroundColor: '#30363D',
                  borderRadius: '999px',
                  padding: '2px 8px',
                  fontSize: '12px',
                  color: '#8B949E'
                }}>
                  {tasks.filter(t => t.status === column.id).length}
                </span>
              </div>

              {tasks
                .filter(task => task.status === column.id)
                .map(task => (
                  <div key={task.id} style={{
                    backgroundColor: '#0D1117',
                    border: '1px solid #30363D',
                    borderRadius: '8px',
                    padding: '12px',
                    marginBottom: '8px'
                  }}>
                    <div style={{
                      display: 'inline-block',
                      backgroundColor: getPriorityColor(task.priority),
                      color: '#FFFFFF',
                      padding: '2px 8px',
                      borderRadius: '999px',
                      fontSize: '10px',
                      fontWeight: 'bold',
                      marginBottom: '8px',
                      textTransform: 'uppercase'
                    }}>
                      {task.priority}
                    </div>

                    <p style={{ margin: '0 0 12px 0', fontSize: '14px', lineHeight: '1.4' }}>
                      {task.title}
                    </p>

                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <span style={{
                        backgroundColor: '#30363D',
                        borderRadius: '999px',
                        padding: '4px 10px',
                        fontSize: '12px',
                        color: '#8B949E'
                      }}>
                        👤 {task.assignee}
                      </span>

                      {column.id !== 'done' && (
                        <button
                          onClick={() => moveTask(task.id, getNextStatus(task.status))}
                          style={{
                            backgroundColor: '#6D28D9',
                            color: '#FFFFFF',
                            border: 'none',
                            borderRadius: '6px',
                            padding: '4px 10px',
                            fontSize: '11px',
                            cursor: 'pointer'
                          }}>
                          Move →
                        </button>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SprintBoard;